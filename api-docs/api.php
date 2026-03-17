<?php
## AVTO.JP 2025 :: v3.1 - PHP 5.3+ & 8.3 Compatible
## https://ajes.com/api/sql2json      <- deprecated, old version v3.0
## https://ajes.com/api/aj_bids.txt   <- table structure FOR BIDS HISTORY

## API SERVER      LOCATION  TABLES                          FEATURES
## 78.46.90.228    DE        main,stats,one,korea,china      month,BIG+TAA,report,translation
## 87.242.72.57    RU        main,stats,one,korea,china,hdm  month,BIG+TAA,report,translation
## 144.76.203.145  DE        main,stats,one,hdm

## Debug :: error_reporting(E_ALL);ini_set('display_errors',1);
error_reporting(0);

## Configuration class
class AJ_CONF
{
    ## Access
    static $API_CODE = 'DvemR43s';       // REQUIRED - Your API code
    static $API_SERVER = '78.46.90.228'; // REQUIRED - Primary requests endpoint
    static $API_SERVER_ALT = '144.76.203.145'; // Alternative DE-server by request
    static $API_SERVER_CDN = '87.242.72.57';   // Alternative RU-server by request
    static $TABLE = 'main';              // Table names: main,stats,one,korea,china,hdm

    ## Performance
    static $CACHE_DIR = '';              // Cache folder 'aj_cache', or empty to disable
    static $API_MODE = 'api';            // 'api' or 'gzip' for faster response
    static $QUALITY_IMAGES = 1;          // 0=>with low quality, 1=>show quality images
    static $ITEMS_PER_PAGE = 20;         // Number of items per page
    static $GRID_VIEW = 1;               // 0=>Table, 1=>Grid

    ## Debug
    static $DEBUG = 1;

    ## Limitation
    static $SQL_GLOBAL = '';             // try: ' year > 2022 AND '
    public static function initSQL()
    {

        ## Initialize grid view from cookie
        if (isset($_COOKIE['grid_view'])) {
            self::$GRID_VIEW = $_COOKIE['grid_view'] === '1';
        }

        self::$SQL_GLOBAL .= self::$TABLE == 'hdm' ? " IS_STAT=0 AND " : ""; // today and future

        self::$SQL_GLOBAL .= (self::$TABLE == 'main' || self::$TABLE == 'stats')
            && self::$QUALITY_IMAGES == 1 ? " AUCTION_TYPE!=1 AND " : "";      // exclude low-quality

        ## Remove unnecessary fields
        $fieldsToRemove = array(
            'bike' => array('AUCTION_TYPE', 'KUZOV', 'LOT', 'PRIV', 'KPP', 'KPP_TYPE', 'KPP:KPP_TYPE'),
            'hdm' => array('AUCTION_TYPE', 'KUZOV', 'EQUIP', 'COLOR', 'ENG_V', 'TIME', 'ENG_V:TIME')
        );
        if (isset($fieldsToRemove[self::$TABLE])) {
            foreach ($fieldsToRemove[self::$TABLE] as $field) {
                unset(self::$TABLE_COLUMNS[$field]);
            }
        }
    }

    ## Caching
    public static $CACHE_TTL = array(
        'main' => array(30, 'JPY'),    // 30 minutes
        'stats' => array(1440, 'JPY'),  // 24 hours
        'one' => array(360, 'JPY', 1), // 6 hours, stock
        'hdm' => array(360, 'JPY'),   // 6 hours
        'korea' => array(720, 'KRW', 1), // 12 hours, stock
        'china' => array(720, 'CNY', 1), // 12 hours, stock
    );

    ## Output
    public static $TABLE_COLUMNS = array(
        ## Common fields
        'IMAGES' => 'Photos',
        //'ID' => 'ID',
        'LOT' => 'Lot<br>number',
        'AUCTION_TYPE' => 'Auction<br>type',
        'AUCTION_DATE:AUCTION:TOWN' => 'Auction date<br>Auction<br>Town',
        //'MARKA_ID' => 'Vendor ID',
        //'MODEL_ID' => 'Model ID',
        'MODEL_NAME:MARKA_NAME' => 'Vendor<br>Model',
        'YEAR' => 'Year',
        'ENG_V:TIME' => 'Engine (cc)<br>Fuel',
        'PW' => 'Power (hp)',
        'KUZOV' => 'Body',
        'GRADE:EQUIP' => 'Grade<br>Equipment',
        'COLOR' => 'Color',
        'KPP:KPP_TYPE' => 'Transmission<br>Type',
        'PRIV' => 'Drive',
        'MILEAGE' => 'Mileage (km)',
        'RATE' => 'Rate',
        'START:FINISH:STATUS' => 'Start price<br>Finish price<br>Status',
        //'AVG_PRICE' => 'Avg Price',
        //'AVG_STRING' => 'Price History',
        'LHDRIVE' => 'Left<br>Hand<br>Drive',

        ## Uncomment for hdm
        /* 'IS_STAT' => 'From<br>stat.',
           'GROUP:GG' => 'Category<br>Category ID',
           'CATEGORY:CC' => 'Sub-category<br>Sub-category ID',
           'VOLUME' => 'Location',
           'PRICE' => 'Start<br>price',
           'SERIAL'=> 'Chassis<br>number', */

        ## Uncomment for bike, bike_st
        /* 'LOT_NUM' => 'Lot<br>number',
           'AUCTION_ID' => 'Auction<br>id',
           'MIL_NOTE' => '',// mileage with text
           'RATE_ENG' => 'Rate<br>engine',
           'RATE_FRONT' => 'Rate<br>front',
           'RATE_EXT' => 'Rate<br>ext',
           'RATE_REAR' => 'Rate<br>rear',
           'RATE_EL' => 'Rate<br>el',
           'RATE_FRAME' => 'Rate<br>frame',
           'INSPECTION' => 'Instpection',
           'SERIAL'=> 'Chassis<br>number', */
    );
}

## API class with static methods
class AJ_API
{
    ## Get client IP address
    public static function getClientIp()
    {
        return isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : $_SERVER['REMOTE_ADDR'];
    }

    ## Sanitize input data
    public static function sanitizeInput($input)
    {
        return substr(htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8'), 0, 64);
    }

    ## Build API URL
    public static function buildApiUrl($sql)
    {
        $ip = self::getClientIp();
        $sql = urlencode(preg_replace("/%25/", "%", $sql));
        return 'http://' . AJ_CONF::$API_SERVER . '/' . AJ_CONF::$API_MODE .
            '/?ip=' . $ip . '&json&code=' . AJ_CONF::$API_CODE . '&sql=' . $sql;
    }

    ## Decode GZIP response
    public static function decodeGzip($data, $server)
    {
        if ($server === AJ_CONF::$API_SERVER_ALT || $server === AJ_CONF::$API_SERVER_CDN) {
            return gzinflate(substr($data, 10, -8));
        }
        return gzuncompress(preg_replace("/^\\x1f\\x8b\\x08\\x00\\x00\\x00\\x00\\x00/", "", $data));
    }

    ## Get cached data from API
    public static function getCachedApiData($sql, $minutes = null)
    {
        if ($minutes === null) {
            ## Cache TTL
            $minutes = AJ_CONF::$CACHE_TTL[AJ_CONF::$TABLE][0];
            if ($minutes == 0) {
                $minutes = 60;
            } ## if not defined in $CACHE_TTL
        }

        if (AJ_CONF::$CACHE_DIR !== '') {
            $cachedData = AJ_CACHE::getCachedData($sql, $minutes);
            if ($cachedData !== null) {
                return $cachedData;
            }
        }

        $data = self::fetchApiData($sql);

        if (AJ_CONF::$CACHE_DIR !== '' && !isset($data['error'])) {
            AJ_CACHE::saveToCache($sql, $data);
        }
        return $data;
    }

    ## Get data from API
    public static function fetchApiData($sql)
    {
        $url = AJ_API::buildApiUrl($sql);
        //die($url);

        $context = stream_context_create(array(
            'http' => array('timeout' => 15) // 15 seconds timeout
        ));
        $response = @file_get_contents($url, false, $context);
        if ($response === false) {
            return array('error' => 'Failed to fetch data from API ' . preg_replace("/" . AJ_CONF::$API_CODE . "/", '', $url));
        }

        // Debug URL - consider removing in production
        if (AJ_CONF::$DEBUG == 1) {
            echo "<div style='clear:both'></div>
                <div style='display:inline-block;width:auto;font-size:13px;background:#f5efa7;border-radius:7px;padding:4px 15px 4px 20px;margin:0px 5px 5px 0px'>
                <nobr><a style='font-size:13px;color:#000' href='$url'>API Request URL</a>
                <a style='font-size:13px;margin:0px 10px 0px 10px;color:#000' href='" . preg_replace("/json&/", '', $url) . "'>XML</a>
                " . strlen($response) . "&nbsp;bytes from <span style='color:#1d60da'>" . strtoupper(AJ_CONF::$TABLE) . "</span></div>
                <div style='clear:both'></div>";
        }

        if (AJ_CONF::$API_MODE === 'gzip') {
            $response = AJ_API::decodeGzip($response, AJ_CONF::$API_SERVER);
        }

        $data = json_decode($response, true);
        return is_array($data) ? $data : array('error' => 'Invalid JSON response');
    }
}

## CACHE class with static methods
class AJ_CACHE
{
    ## Get cache file path
    public static function getCachePath($sql)
    {
        $file = md5($sql);
        $dir = dirname(__FILE__) . '/' . AJ_CONF::$CACHE_DIR . '/' . substr($file, -2);
        return array($dir, $dir . '/' . $file);
    }

    ## Get cached data
    public static function getCachedData($sql, $ttl)
    {
        list($dir, $file) = self::getCachePath($sql);

        if (file_exists($file) && (filemtime($file) > (time() - 60 * $ttl))) {
            return unserialize(@file_get_contents($file));
        }
        return null;
    }

    ## Save data to cache
    public static function saveToCache($sql, $data)
    {
        list($dir, $file) = self::getCachePath($sql);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        @file_put_contents($file, serialize($data));
    }
}

## Car Listing class
class AJ_SEARCH
{
    private $startTime;
    private $sql_local = '';
    private $url_params = array();

    ## Stop bot traffic
    private function stopBot()
    {
        if (
            preg_match(
                "/(bot|crawler|semrush|ahrefs|scrapy|gptbot|amazonbot|sleuth|sbintu|spider|chatgpt|openai)/i"
                ,
                $_SERVER['HTTP_USER_AGENT']
            )
        ) {

            header('HTTP/1.1 403 Forbidden');
            die('Access denied');
        }
    }

    ## Handle grid/table view toggle
    private function handleViewToggle()
    {
        //echo $_COOKIE['grid_view'];

        if (isset($_GET['toggle_view'])) {
            $newView = !AJ_CONF::$GRID_VIEW;
            setcookie('grid_view', $newView ? '1' : '0', time() + 86400 * 30, '/');
            AJ_CONF::$GRID_VIEW = $newView;

            // Redirect to avoid form resubmission
            $url = preg_replace("/toggle_view=\d/", '', $_SERVER['REQUEST_URI']);
            header('Location: ' . rtrim($url, "?&"));
            exit;
        }
    }

    ## Initialize page
    private function initPage()
    {
        ## STOP BOT
        $this->stopBot();

        header('Content-Type: text/html; charset=UTF-8');
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>AVTO.JP API v3.1 php5.3-8.3</title>
            <link rel='stylesheet' href='https://ajes.com/api/style.css'>
            <script>
                function image_nofoto(el) {
                    if ((el.naturalWidth == 319 || el.naturalWidth == 1) && /\.ajes\.com/.test(el.src)) {
                        el.parentElement.style.display = 'none';
                    }
                }
            </script>
        </head>
        <body>";
    }

    ## Display single car details
    public function displayCarDetails($id)
    {
        $id = AJ_API::sanitizeInput($id);
        $car = AJ_API::getCachedApiData("SELECT * FROM " . AJ_CONF::$TABLE . " WHERE " . AJ_CONF::$SQL_GLOBAL . " id='$id'");

        if (empty($car)) {
            echo "<div class='error'>Car not found</div>";
            return;
        }

        $car = $car[0];
        $images = explode('#', $car['IMAGES']);

        echo '<div class="img-container">';  // auction sheet always first ($key=0)
        foreach ($images as $key => $img) {  // keep MEDIUM size for images number 3,4,5,..
            $imgUrl = ($key === 0 || $key === 1) ? $img : $img . '&w=320';

            echo "<a href='$imgUrl'><img src='$imgUrl' height='240px' onload='image_nofoto(this);'></a>";

        }
        echo '</div>';

        echo '<table class="tb" cellpadding="0" cellspacing="0">';
        foreach ($car as $field => $val) {
            if (in_array($field, array('IMAGES', 'AVG_STRING')))
                continue; // skip

            ## Add JPY/KRW/CNY
            $this->formatColumn($val, $field);

            if ($field === 'INFO' && is_array($val)) {
                $val = '<pre>' . htmlspecialchars(print_r($val, true)) . '</pre>';
            }

            echo "<tr><td class='h'>$field</td><td style='width:320px'>$val</td></tr>";
        }
        echo '</table>';
    }

    ## Display list of cars by model with filters
    public function displayModelCars($model)
    {
        $model = AJ_API::sanitizeInput($model);
        $page = isset($_GET['page']) ? max(1, (int) $_GET['page']) : 1;
        $offset = ($page - 1) * AJ_CONF::$ITEMS_PER_PAGE;

        // Get total count
        $countSql = "SELECT COUNT(*) FROM " . AJ_CONF::$TABLE . " WHERE " . AJ_CONF::$SQL_GLOBAL . " " . $this->sql_local;
        $count = AJ_API::getCachedApiData($countSql);
        $total = current($count[0]);

        echo "<div class='pagination-info'>LOTS: $total</div>";
        $this->renderPagination($total, $page);

        // Get paginated data
        $sql = "SELECT * FROM " . AJ_CONF::$TABLE . " WHERE " . AJ_CONF::$SQL_GLOBAL . " " . $this->sql_local .
            " ORDER BY year DESC, mileage DESC LIMIT $offset, " . AJ_CONF::$ITEMS_PER_PAGE;

        $cars = AJ_API::getCachedApiData($sql);

        if (empty($cars)) {
            echo "<div class='error'>No cars found</div>";
            return;
        }

        ## Grid view
        if (AJ_CONF::$GRID_VIEW == 1) {
            foreach ($cars as $car) {

                $this->formatColumn($car['START'], 'START');
                $this->formatColumn($car['FINISH'], 'FINISH');
                $this->formatColumn($car['PRICE'], 'PRICE');

                $images = explode('#', $car['IMAGES']);
                $img1 = isset($images[0]) ? $images[0] : '';
                $img2 = isset($images[1]) ? $images[1] : '';

                $img = AJ_CONF::$TABLE == 'hdm' ? $img2 : $img1;          // fix hdm
                $img = preg_replace("/&.*$/", '', $img);                    // remove size &h=50
                // MEDIUM size 320px
                $img = $img == '' ? '<div style="height:241px;width:320px;background:#f0f0f0"></div>'
                    : '<img src="' . $img . '&w=320" width=320px height=240px>';

                echo '<div class=aj_search_grid>
                        <a style="display:inline-block" href="?id=' . $car['ID'] . '">' . $img . '</a>

                        <div style="float:left;padding-left:5px">'
                    . preg_replace("/:00$/", '', $car['AUCTION_DATE']) . ' > ' . substr($car['AUCTION'], 0, 16) . ' > ' . $car['LOT'] . '<br>'
                    . $car['MARKA_NAME'] . ' ' . $car['MODEL_NAME'] . ' / ' . $car['YEAR'] . '<br>'
                    . $car['ENG_V'] . 'cc | ' . $car['MILEAGE'] . 'km | ' . $car['RATE'] . '
                        </div>

                        <div style="float:left;padding-left:5px;color:#8c58a2">'
                    . $car['START'] . '<br>' . $car['FINISH'] . '<br>' . $car['STATUS'] . '
                        </div>

                      </div>';
            }
            echo '<div style="clear:both"></div>';
        }

        ## Table view
        else {
            echo '<table class="tb" cellpadding="0" cellspacing="0">';
            echo '<tr class="h"><td>' . implode('</td><td>', array_values(AJ_CONF::$TABLE_COLUMNS)) . '</td></tr>';

            foreach ($cars as $car) {
                $this->prepareCarRowData($car);
                $rowData = $this->buildTableRowData($car);

                // Custom format row
                if ($car['AUCTION_TYPE'] == 1) {
                    echo '<tr style="background:#f9f8e6"><td>' . implode('</td><td>', $rowData) . '</td></tr>';
                } else {
                    echo '<tr><td>' . implode('</td><td>', $rowData) . '</td></tr>';
                }
            }
            echo '</table>';
        }
        $this->renderPagination($total, $page);
    }

    ## Prepare car row data for display
    private function prepareCarRowData(&$car)
    {
        // Process images
        $images = explode('#', $car['IMAGES']);
        $car['IMAGES'] = '';
        foreach ($images as $img) {
            $car['IMAGES'] .= "<img height='60px' src='$img'>";
        }

        // Make LOT clickable
        if (isset($car['LOT'])) {
            $car['LOT'] = '<div class="pagination"><a href="?id=' . $car['ID'] . '"><u>' . $car['LOT'] . '</u></a></div>';
        }
        if (isset($car['LOT_NUM'])) {
            $car['LOT_NUM'] = '<div class="pagination"><a href="?id=' . $car['ID'] . '"><u>' . $car['LOT_NUM'] . '</u></a></div>';
        }

        // Combine columns with : separator
        foreach (array_keys(AJ_CONF::$TABLE_COLUMNS) as $column) {
            if (strpos($column, ':') !== false) {
                $this->combineColumns($car, $column);
            } else {
                ## Add JPY/KRW/CNY
                $this->formatColumn($car[$column], $column);
            }
        }
    }

    ## Build table row data array
    private function buildTableRowData($car)
    {
        $rowData = array();
        foreach (array_keys(AJ_CONF::$TABLE_COLUMNS) as $column) {
            $rowData[] = $car[$column];
        }
        return $rowData;
    }

    ## Format column
    private function formatColumn(&$val, $field)
    {
        $currency = AJ_CONF::$CACHE_TTL[AJ_CONF::$TABLE][1];

        if ($field == 'AVG_PRICE')
            $val = (int) $val . ' ' . $currency;
        if ($field == 'START')
            $val = (int) $val . ' ' . $currency;
        if ($field == 'FINISH')
            $val = (int) $val . ' ' . $currency;
        if ($field == 'PRICE')
            $val = (int) $val . ' ' . $currency; // hdm
        if ($field == 'AUCTION_DATE')
            $val = preg_replace("/:\d\d$/", '', $val);

        ## Skip for stock
        if (AJ_CONF::$CACHE_TTL[AJ_CONF::$TABLE][2] == 1) {
            if ($field == 'AVG_PRICE')
                $val = '';
            if ($field == 'START')
                $val = '';
        }
    }

    ## Combine multiple columns into one
    private function combineColumns(&$car, $columnKey)
    {
        if (strpos($columnKey, ':') !== false) {
            $combined = array();
            foreach (explode(':', $columnKey) as $column) {

                ## Add JPY/KRW/CNY
                $this->formatColumn($car[$column], $column);

                if (isset($car[$column])) {
                    $combined[] = $car[$column];
                }
            }

            ## Remove empty strings
            $combined = array_filter($combined, 'strlen');
            $car[$columnKey] = !empty($combined) ? implode('<br>', $combined) : '';
        }
    }

    ## Display models by vendor
    public function displayVendorModels($models, $vendor)
    {
        $params = $this->url_params;

        $vendor = AJ_API::sanitizeInput($vendor);
        if (empty($models)) {
            echo "<div class='error' style='color:#1d60da'>Select vendor</div>";
            return;
        }

        echo '<div class="model-list">';
        foreach ($models as $model) {
            $params['vendor'] = $vendor;
            $params['model'] = $model['MODEL_NAME'];
            $url = "?" . http_build_query($params);
            echo "<a href='$url'>" . $model['MODEL_NAME'] . "</a> " . $model['TAG1'] . "<br>";
        }
        echo '</div>';
    }

    ## Display all vendors
    public function displayAllVendors($vendors)
    {
        $params = $this->url_params;

        echo '<div class="vendor-list">';
        foreach ($vendors as $vendor) {
            if ($vendor['MARKA_NAME'] == '') {
                continue;
            } // fix hdm
            $params['vendor'] = $vendor['MARKA_NAME'];
            $url = "?" . http_build_query($params);
            echo "<a href='$url'>" . $vendor['MARKA_NAME'] . "</a> " . $vendor['TAG1'] . "<br>";
        }
        echo '</div>';
    }

    ## Display filter form
    public function displayFilterForm(&$out)
    {
        $out['vendors'] = AJ_API::getCachedApiData(
            "SELECT marka_name, count(*) FROM " . AJ_CONF::$TABLE . " 
                 WHERE " . AJ_CONF::$SQL_GLOBAL . " " . $this->sql_local . "
                 GROUP BY marka_name ORDER BY marka_name ASC"
        );

        echo '<div class="filter-form">
            <form method="get" action="" name="filterForm" id="filterForm">
                <select name="vendor" id="vendorSelect" onchange="resetFilters(this)">
                    <option value="">All Vendors</option>';

        foreach ($out['vendors'] as $vendor) {
            if ($vendor['MARKA_NAME'] == '')
                continue;
            $selected = (isset($_GET['vendor']) && $_GET['vendor'] == $vendor['MARKA_NAME']) ? 'selected' : '';
            echo '<option value="' . $vendor['MARKA_NAME'] . '" ' . $selected . '>' . $vendor['MARKA_NAME'] . ' (' . $vendor['TAG1'] . ')</option>';
        }
        echo '</select>';

        if (isset($_GET['vendor']) && $_GET['vendor']) {
            $out['models'] = AJ_API::getCachedApiData(
                "SELECT model_name, count(*) FROM " . AJ_CONF::$TABLE . "
                 WHERE " . AJ_CONF::$SQL_GLOBAL . " " . $this->sql_local . " AND
                       marka_name='" . AJ_API::sanitizeInput($_GET['vendor']) . "'
                 GROUP BY model_name ORDER BY model_name"
            );
        }

        echo '<select name="model" id="modelSelect"' . (isset($_GET['vendor']) ? '' : ' disabled') . ' onchange="this.form.submit()">
                    <option value="">All Models</option>';

        if (isset($_GET['vendor']) && $_GET['vendor']) {
            foreach ($out['models'] as $model) {
                $selected = (isset($_GET['model']) && $_GET['model'] == $model['MODEL_NAME']) ? 'selected' : '';
                echo '<option value="' . $model['MODEL_NAME'] . '" ' . $selected . '>' . $model['MODEL_NAME'] . ' (' . $model['TAG1'] . ')</option>';
            }
        }
        echo '</select>';

        $fields = array(
            'year_from' => 'Year from',
            'year_to' => 'Year to',
            'engine_from' => 'Engine from',
            'engine_to' => 'Engine to',
            'mileage_from' => 'Mileage from',
            'mileage_to' => 'Mileage to',
            'kuzov' => 'Chassis',
            'lot_number' => 'Lot Number'
        );
        foreach ($fields as $name => $placeholder) {
            $value = isset($_GET[$name]) && $_GET[$name] != '' ? preg_replace("/[^a-zA-Z0-9]/", '', $_GET[$name]) : '';
            echo "<input type='text' name='$name' placeholder='$placeholder' value='$value'>";
        }
        echo '<input type="submit" class="search-btn" value="SEARCH">';
        echo '<input type="submit" class="reset-btn" onclick="resetFilters();" value="RESET">
              <a href="' . $_SERVER['REQUEST_URI'] . (strpos($_SERVER['REQUEST_URI'], '?') === false ? '?' : '&') .
            'toggle_view=1" class="view-toggle">' . (AJ_CONF::$GRID_VIEW ? 'TABLE&nbsp;VIEW' : 'GRID&nbsp;VIEW') . '</a>
            </form>

            <script>
            function resetFilters(select) {
                el = document.forms.filterForm;
                el.model.value = el.year_from.value = el.year_to.value = el.engine_from.value = 
                el.engine_to.value = el.mileage_from.value = el.mileage_to.value = el.lot_number.value = el.kuzov.value = "";

                // select is not being passed when RESET is clicked
                if (!select) document.getElementById("vendorSelect").value = "";

                // If a vendor is selected, activate the model select
                document.getElementById("modelSelect").disabled = select.value === "";

                // Submit the form
                el.submit();
            }
            </script>
        </div>';
    }

    ## Build filter conditions :: $this->sql_local, $this->url_params
    public function buildFilterConditions()
    {
        $filters = array(
            'vendor' => array('field' => 'marka_name', 'type' => 'string'),
            'model' => array('field' => 'model_name', 'type' => 'string'),
            'year_from' => array('field' => 'year', 'type' => 'int', 'operator' => '>='),
            'year_to' => array('field' => 'year', 'type' => 'int', 'operator' => '<='),
            'engine_from' => array('field' => 'eng_v', 'type' => 'int', 'operator' => '>='),
            'engine_to' => array('field' => 'eng_v', 'type' => 'int', 'operator' => '<='),
            'mileage_from' => array('field' => 'mileage', 'type' => 'int', 'operator' => '>='),
            'mileage_to' => array('field' => 'mileage', 'type' => 'int', 'operator' => '<='),
            'kuzov' => array('field' => 'kuzov', 'type' => 'string'),
            'lot_number' => array('field' => 'lot', 'type' => 'string')
        );

        foreach ($filters as $key => $config) {
            if (!empty($_GET[$key])) {
                $value = AJ_API::sanitizeInput($_GET[$key]);

                if ($config['type'] === 'int') {
                    $value = (int) $value;
                    $where[] = $config['field'] . ' ' . $config['operator'] . ' ' . $value;
                } else {
                    $where[] = $config['field'] . " = '" . addslashes($value) . "'";
                }
                $filterParams[$key] = $value;
            }
        }

        if (empty($where)) {
            $where[] = "1=1";
        }

        // Set private variables
        $this->sql_local = implode(" AND ", $where);
        $this->url_params = $filterParams;
    }

    ## Render pagination links
    private function renderPagination($total, $currentPage)
    {
        $pages = ceil($total / AJ_CONF::$ITEMS_PER_PAGE);
        if ($pages <= 1) {
            return;
        }

        $params = $this->url_params;

        echo '<div class="pagination">';
        for ($i = 1; $i <= $pages; $i++) {
            $params['page'] = $i;
            $url = "?" . http_build_query($params);
            $active = ($i == $currentPage) ? 'active' : '';
            echo "<a class='page-num $active' href='$url'>$i</a>";
        }
        echo '</div><div style="clear:both"></div>';
    }

    ## Close page and show execution time
    public function closePage()
    {
        $execTime = round(microtime(true) - $this->startTime, 3);
        echo '<div style="clear:both"></div>
              <div style="display:block;margin-top:10px;color:#73aa00">Execution time: ' . $execTime . ' sec</div>
              </body>
              </html>';
    }

    ## Search router
    public function __construct()
    {
        ## initialize $SQL_GLOBAL
        AJ_CONF::initSQL();
        $this->startTime = microtime(true);
        $this->handleViewToggle(); // before echo
        $this->initPage();

        ## build Filters
        $out = array();
        $this->buildFilterConditions(); // $this->sql_local, $this->url_params
        $this->displayFilterForm($out); // $out = array('vendors'=>Array,'models'=>Array);

        switch (true) {
            case isset($_GET['id']):
                $this->displayCarDetails($_GET['id']);
                break;

            case isset($_GET['model']) && strlen($_GET['model']) > 0:
                $this->displayModelCars($_GET['model']);
                break;

            case isset($_GET['vendor']) && strlen($_GET['vendor']) > 0:
                $this->displayVendorModels($out['models'], $_GET['vendor']);
                break;

            default:
                $this->displayAllVendors($out['vendors']);
                break;
        }
        $this->closePage();
    }
}

## Run search
new AJ_SEARCH();