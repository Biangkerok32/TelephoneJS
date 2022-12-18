const fs = require("fs")
const convert = require("xml-js")

//////////////////////////////////////////////////
//// INTERFACE ELEMENTS //////////////////////////
//////////////////////////////////////////////////

const ELEMENTS = {
    "screen": {
        "runTimeName": "Screen",
        "attributes": ["class", "id", "aboutscreen", "accentcolor", "accent", "alignhorizontal",
            "halign", "alignvertical", "valign", "appname", "backgroundcolor",
            "backgroundimage", "bigdefaulttext", "closescreenanimation",
            "defaultfilescope", "highcontrast", "icon", "openscreenanimation",
            "primarycolor", "primarycolordark", "screenorienation",
            "scrollable", "showlistsasjson", "sizing", "theme",
            "showtitle", "showstatusbar", "statusbar", "title", "versioncode", "versionname", "name"]
    },

    //start UI elements
    "button": {
        "runTimeName": "Button",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "checkbox": {
        "runTimeName": "CheckBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "checked", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "visible", "textcolor", "textalign", "col", "row", "name"]
    },
    "datepicker": {
        "runTimeName": "DatePicker",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "visible", "textcolor", "col", "row", "name"]
    },
    "image": {
        "runTimeName": "Image",
        "attributes": ["class", "id", "alt", "clickable", "height", "width", "picture", "rotationangle", "scalepicturetofit", "visible", "col", "row", "name"]
    },
    "label": {
        "runTimeName": "Label",
        "attributes": ["class", "id", "text", "backgroundcolor", "bold", "italic", "fontsize", "typeface", "html", "margins", "height", "width", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "listpicker": {
        "runTimeName": "ListPicker",
        "attributes": ["class", "id", "backgroundcolor", "elements", "enabled", "bold", "italic", "fontsize", "typeface", "image", "height", "width", "itembg", "itembackground", "itemtextcolor", "itemcolor", "selection", "shape", "showfeedback", "showfilter", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "listview": {
        "runTimeName": "ListView",
        "attributes": ["class", "id", "backgroundcolor", "elememts", "fontsizedetail", "typeface", "typefacedetail", "height", "width", "imageheight", "imagewidth", "data", "layout", "orientation", "selection", "selectioncolor", "showfilter", "textcolor", "textcolordetail", "textsize", "visible", "col", "row", "name"]
    },
    "notifier": {
        "runTimeName": "Notifier",
        "attributes": ["class", "id", "backgroundcolor", "textcolor", "length", "name"]
    },
    "password": {
        "runTimeName": "PasswordTextBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "hint", "numbers", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    "slider": {
        "runTimeName": "Slider",
        "attributes": ["class", "id", "leftcolor", "rightcolor", "width", "max", "min", "thumbenabled", "thumbposition", "col", "row", "name"]
    },
    "spinner": {
        "runTimeName": "Spinner",
        "attributes": ["class", "id", "elements", "width", "prompt", "selection", "visible", "col", "row", "name"]
    },
    "switch": {
        "runTimeName": "Switch",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "on", "textcolor", "thumbcoloractive", "thumbcolorinactive", 'trackcoloractive', 'trackcolorinactive', "visible", "col", "row", "name"]
    },
    "textbox": {
        "runTimeName": "TextBox",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "multiline", "numbers", "readonly", "textalign", "visible", "textcolor", "col", "row", "name"]
    },
    'timepicker': {
        "runTimeName": "TimePicker",
        "attributes": ["class", "id", "text", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "visible", "textalign", "textcolor", "col", "row", "name"]
    },
    'webview': {
        "runTimeName": "WebViewer",
        "attributes": ["class", "id", "followlinks", "height", "width", "url", "ignoressl", "promptpermission", "uselocation", "visible", "col", "row", "name"]
    },
    //start layout elements
    "hbox": {
        "runTimeName": "HorizontalArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row", "name"]
    },
    "vbox": {
        "runTimeName": "VerticalArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row", "name"]
    },
    "hscrollbox": {
        "runTimeName": "HorizontalScrollArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row", "name"]
    },
    "vscrollbox": {
        "runTimeName": "VerticalScrollArrangement",
        "attributes": ["class", "id", "halign", "valign", "width", "height", "backgroundcolor", "image", "visible", "col", "row", "name"]
    },
    "table": {
        "runTimeName": "TableArrangement",
        "attributes": ["class", "id", "width", "height", "visible", "columns", "rows", "col", "row", "name"]
    },
    //start media elements
    "camcorder": {
        "runTimeName": "Camcorder",
        "attributes": ["class", "id", "name"]
    },
    "camera": {
        "runTimeName": "Camera",
        "attributes": ["class", "id", "name"]
    },
    "imagepicker": {
        "runTimeName": "ImagePicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "text", "textalign", "textcolor", "visible", "name"]
    },
    "videoplayer": {
        "runTimeName": "VideoPlayer",
        "attributes": ["class", "id", "height", "width", "source", "visible", "volume", "name"]
    },
    "player": {
        "runTimeName": "Player",
        "attributes": ["class", "id", "loop", "playonlyinforeground", "source", "volume", "name"]
    },
    "sound": {
        "runTimeName": "Sound",
        "attributes": ["class", "id", "minimuminterval", "source", "name"]
    },
    "soundrecorded": {
        "runTimeName": "SoundRecorded",
        "attributes": ["class", "id", "savedrecording", "name"]
    },
    "speechrecognizer": {
        "runTimeName": "SpeechRecognizer",
        "attributes": ["class", "id", "uselegacy", "name"]
    },
    "texttospeech": {
        "runTimeName": "TextToSpeech",
        "attributes": ["class", "id", "country", "language", "lang", "pitch", "speechrate", "name"]
    },
    "translator": {
        "runTimeName": "Translator",
        "attributes": ["class", "id", "apikey", "name"]
    },
    //start drawing and animation elements
    "canvas": {
        "runTimeName": "Canvas",
        "attributes": ["class", "id", "backgroundcolor", "backgroundimage", "extendmovesoutsidecanvas", "extend", "fontsize", "height", "width", "linewidth", "paintcolor", "paint", 'tapthreshold', 'textalign', 'visible', "name"]
    },
    "ball": {
        "runTimeName": "Ball",
        "attributes": ["class", "id", "enabled", "heading", "interval", "originatcenter", "paint", "paintcolor", "radius", "speed", "visible", "x", "y", "z", "name"]
    },
    "sprite": {
        "runTimeName": "ImageSprite",
        "attributes": ["class", "id", "enabled", "heading", "height", "width", "interval", "picture", "rotates", "speed", "visible", "x", "y", "z", "name"]
    },
    //start Maps
    //43 things to go
    "map": {
        "runTimeName": "Map",
        "attributes": ["class", "id", "center", "centerfromstring", "enablepan", "enablerotation", "enablezoom", "height", "width", "locationsensor", "maptype", "rotation", "scaleunits", "showcompass", "showscale", "showuser", "showzoom", "visible", "zoomlevel", "name"]
    },
    "circle": {
        "runTimeName": "",
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "latitude", "lat", "longitude", "lon", "radius", "strokecolor", "strokewidth", "title", "visible", "name"]
    },
    /*  "featurecollection": {      //there may be issues here - especially with url as the source of the data - unable to test
          "runTimeName": "FeatureCollection",
          "attributes": ["featuresfromgeojson", "source", "visible"]
      },*/
    "linestring": {
        "runTimeName": "LineString",
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "pointsfromstring", "points", "strokecolor", "strokeopacity", "strokewidth", "title", "visible", "name"]
    },
    "marker": {
        "runTimeName": "Marker",
        "attributes": ["class", "id", "anchorhorizontal", "anchorvertical", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "height", "width", "imageasset", "latitude", "lat", "longitude", "lon", "strokecolor", "strokeopacity", "strokewidth", "title", "visible", "name"]
    },
    "navigation": {
        "runTimeName": "Navigation",
        "attributes": ["class", "id", "apikey", "endlatitude", "endlat", "endlongitude", "endlon", "language", "startlatitude", "startlat", "startlongitude", "startlon", "transportationmethod", "method", "name"]
    },
    "polygon": {
        "runTimeName": "Polygon",
        "attributes": ["class", "id", "description", "draggable", "enableinfobox", "fillcolor", "fillopacity", "holepointsfromstring", "pointsfromstring", "strokecolor", "strokeopacity", "strokewidth", "title", "visible", "name"]
    },
    "rectangle": {
        "runTimeName": "Rectangle",
        "attributes": ["class", "id", "description", "draggable", "eastlongitude", "east", "enableinfobox", "fillcolor", "fillopacity", "northlatitude", "north", "southlatitude", "south", "strokecolor", "strokeopacity", "strokewidth", "title", "visible", "westlongitude", "west", "name"]
    },
    //ignoring charts - not sure how they work
    //start sensors
    "acceleronmeter": {
        "runTimeName": "AccelerometerSensor",
        "attributes": ["class", "id", "enabled", "legacymode", "minimuminterval", "sensitivity", "name"]
    },
    "barcodescanner": {
        "runTimeName": "BarcodeScanner",
        "attributes": ["class", "id", "useexternalscanner", "externalscanner", "external", "name"]
    },
    "barometer": {
        "runTimeName": "Barometer",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"]
    },
    "clock": {
        "runTimeName": "Clock",
        "attributes": ["class", "id", "timeralwaysfires", "alwaysfires", "timerenabled", "timerinterval", "name"]
    },
    "gyroscope": {
        "runTimeName": "GyroscopeSensor",
        "attributes": ["class", "id", "enabled", "name"]
    },
    "hygrometer": {
        "runTimeName": "Hygrometer",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"]
    },
    "lightsensor": {
        "runTimeName": "LightSensor",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"]
    },
    "locationsensor": {
        "runTimeName": "LocationSensor",
        "attributes": ["class", "id", "distanceinterval", "enabled", "timeinterval", "name"]
    },
    "magneticfieldsensor": {
        "runTimeName": "MagneticFieldSensor",
        "attributes": ["class", "id", "enabled", "name"]
    },
    "nearfield": {
        "runTimeName": "NearField",
        "attributes": ["class", "id", "readmode", "name"]
    },
    "orientationsensor": {
        "runTimeName": "OrientationSensor",
        "attributes": ["class", "id", "enabled", "name"]
    },
    "pedometer": {
        "runTimeName": "Pedometer",
        "attributes": ["class", "id", "stopdetectiontimeout", "stridelength", "name"]
    },
    "proximitysensor": {
        "runTimeName": "ProximitySensor",
        "attributes": ["class", "id", "enabled", "keeprunningwhenonpause", "name"]
    },
    "thermometer": {
        "runTimeName": "Thermometer",
        "attributes": ["class", "id", "enabled", "refreshtime", "name"]
    },
    //social and communication tools
    "contactpicker": {
        "runTimeName": "ContactPicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "shape", "showfeedback", "text", "textalign", "textcolor", "visible", "name"]
    },
    "emailpicker": {
        "runTimeName": "EmailPicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "shape", "showfeedback", "hint", "text", "textalign", "textcolor", "visible", "name"]
    },
    "phonecall": {
        "runTimeName": "PhoneCall",
        "attributes": ["class", "id", "phonenumber", "name"]
    },
    "phonenumberpicker": {
        "runTimeName": "PhoneNumberPicker",
        "attributes": ["class", "id", "backgroundcolor", "enabled", "bold", "italic", "fontsize", "typeface", "height", "width", "image", "shape", "showfeedback", "text", "textalign", "textcolor", "visible", "name"]
    },
    "sharing": {
        "runTimeName": "Sharing",
        "attributes": ["class", "id", "name"]
    },
    "texting": {
        "runTimeName": "Texting",
        "attributes": ["class", "id", "googlevoiceenabled", "message", "phonenumber", "recievingenabled", "name"]
    },
    "twitter": {
        "runTimeName": "Twitter",
        "attributes": ["class", "id", "consumerkey", "consumersecret", "name"]
    },
    //storage elements
    "clouddb": {
        "runTimeName": "CloudDB",
        "attributes": ["class", "id", "projectid", "redisport", "redisserver", "token", "usessl", "name"]
    },
    "datafile": {
        "runTimeName": "DataFile",
        "attributes": ["class", "id", "defaultscope", "scope", "sourcefile", "name"]
    },
    "file": {
        "runTimeName": "File",
        "attributes": ["class", "id", "defaultscope", "scope", "readpermission", "writepermission", "name"]
    },
    "spreadsheet": {
        "runTimeName": "Spreadsheet",
        "attributes": ["class", "id", "applicationame", "credentialsjson", "credentials", "spreadsheetid", "name"]
    },
    "tinydb": {
        "runTimeName": "TinyDB",
        "attributes": ["class", "id", "namespace", "name"]
    },
    "tinywebdb": {
        "runTimeName": "TinyWebDB",
        "attributes": ["class", "id", "serviceurl", "name"]
    },
    //connectivity elements
    "activitystarter": {
        "runTimeName": "ActivityStarter",
        "attributes": ["class", "id", "action", "activityclass", "activitypackage", "datatype", "datauri", "extrakey", "extravalue", "resultname", "name"]
    },
    "bluetoothclient": {
        "runTimeName": "BluetoothClient",
        "attributes": ["class", "id", "characterencoding", "encoding", "delimiterbyte", "delimiter", "disconnectonerror", "highbytefirst", "pollingrate", "secure", "name"]
    },
    "bluetoothserver": {
        "runTimeName": "BluetoothServer",
        "attributes": ["class", "id", "characterencoding", "encoding", "delimiterbyte", "delimiter", "highbytefirst", "secure", "name"]
    },
    "serial": {
        "runTimeName": "Serial",
        "attributes": ["class", "id", "baudrate", "baud", "buffersize", "buffer", "name"]
    },
    "web": {
        "runTimeName": "Web",
        "attributes": ["class", "id", "allowcookies", "cookies", "responsefilename", "saveresponse", "timeout", "url", "name"]
    }

}

//Attributes and their synonyms
const ATTRIBUTES = {
    "AboutScreen": [],
    "AccentColor": ["accent"],
    "ApiKey": [],
    "AppName": [],
    "AlignHorizontal": ["halign"],
    "AlignVertical": ["valign"],
    "AlternateText": ["alt"],
    "AllowCookies": ["cookies"],
    "AnchorHorizontal": [],
    "AnchorVertical": [],
    "ApplicationName": [],
    "BackgroundColor": [],
    "BackgroundImage": [],
    "BaudRate": ["baud"],
    "BigDefaultText": [],
    "BufferSize": ["buffer"],
    "CenterFromString": ["center"],
    "CharacterEncoding": ["encoding"],
    "Checked": [],
    "Class": [], //for CSS styling
    "Clickable": [],
    "CloseScreenAnimation": [],
    "ColorLeft": ["leftcolor"],
    "ColorRight": ["rightcolor"],
    "Column": ["col"],
    "Columns": ["cols"],
    "ConsumerKey": [],
    "ConsumerSecret": [],
    "Country": [],
    "CredentialsJSON": ["credentials"],
    "DefaultScope": ["scope"],
    "DelimiterByte": ["delimiter"],
    "Description": [],
    "DisconnectOnError": [],
    "Draggable": [],
    "DistanceInterval": [],
    "EastLongitude": ["east"],
    "ElementsFromString": ["elements"],
    "Enabled": [],
    "EnableInfoBox": [],
    "EnablePan": [],
    "EnableRotation": [],
    "EnableZoom": [],
    "EndLatitude": ["endlat"],
    "EndLongitude": ["endlon"],
    "ExtendMovesOutsideCanvas": ["extend"],
    "FeaturesFromGeoJSON": [],
    "FillColor": [],
    "FillOpacity": [],
    "FollowLinks": [],
    "FontBold": ["bold"],
    "FontItalic": ["italic"],
    "FontSize": [],
    "FontSizeDetail": [],
    "FontTypeface": ["typeface"],
    "FontTypefaceDetail": ["typefacedetail"],
    "GoogleVoiceEnabled": [],
    "HasMargins": ["margins"],
    "Heading": [],
    "Height": [],
    "HighByteFirst": [],
    "HighContrast": [],
    "Hint": [],
    "HolePointsFromString": [],
    "HomeUrl": ["url"],
    "HTMLFormat": ["html"],
    "Icon": [],
    "IgnoreSslErrors": ["ignoressl"],
    "Image": [],
    "ImageAsset": [],
    "ImageHeight": [],
    "ImageWidth": [],
    "Interval": [],
    "ItemBackgroundColor": ["itembg", "itembackground"],
    "ItemTextColor": ["itemcolor"],
    "KeepRunningWhenOnPause": [],
    "Language": ["lang"],
    "Latitude": ["lat"],
    "LegacyMode": [],
    "LineWidth": [],
    "ListData": ["data"],
    "ListViewLayout": ["layout"],
    "LocationSensor": [],
    "Longitude": ["lon"],
    "Loop": [],
    "MapType": [],
    "MaxValue": ["max"],
    "Message": [],
    "MinValue": ["min"],
    "MinimumInterval": [],
    "MultiLine": [],
    "Name": ["id"],
    "Namespace": [],
    "NorthLatitude": ["north"],
    "NotifierLength": ["length"],
    "NumbersOnly": ["numbers"],
    "On": [],
    "OpenScreenAnimation": [],
    "Orientation": [],
    "OriginAtCenter": [],
    "PaintColor": ["paint"],
    "PhoneNumber": [],
    "Picture": [],
    "Pitch": [],
    "PlayOnlyInForeground": [],
    "PointsFromString": ["points"],
    "PollingRate": [],
    "PrimaryColor": [],
    "PrimaryColorDark": [],
    "ProjectID": [],
    "Prompt": [],
    "PromptForPermission": ["promptpermission"],
    "Radius": [],
    "ReadOnly": [],
    "ReadMode": [],
    "ReadPermission": [],
    "RecievingEnabled": [],
    "RedisPort": [],
    "RedisServer": [],
    "RefreshTime": [],
    "ResponseFileName": [],
    "Rotation": [],
    "RotationAngle": [],
    "Rotates": [],
    "Row": ["row"],
    "Rows": ["rows"],
    "SavedRecording": [],
    "SaveResponse": [],
    "ScalePictureToFit": [],
    "ScaleUnits": [],
    "ScreenOrientation": [],
    "Scrollable": [],
    "Secure": [],
    "Selection": [],
    "SelectionColor": [],
    "Sensitivity": [],
    "ServiceURL": [],
    "Shape": [],
    "ShowCompass": [],
    "ShowScale": [],
    "ShowUnits": [],
    "ShowZoom": [],
    "ShowFeedback": [],
    "ShowFilterBar": ["showfilter"],
    "ShowListsAsJSON": [],
    "ShowStatusBar": ["statusbar"],
    "Sizing": [],
    "Source": ["src"],
    "SourceFile": [],
    "SouthLatitude": ["south"],
    "SpeechRate": [],
    "SpreadsheetID": [],
    "StartLatitude": ["startlat"],
    "StartLongitude": ["startlon"],
    "StopDetectionTimeout": [],
    "StrideLength": [],
    "StrokeColor": [],
    "StrokeOpacity": [],
    "StrokeWidth": [],
    "Speed": [],
    "Text": [],
    "TextAlignment": ["textalign"],
    "TextColor": [],
    "TextColorDetail": [],
    "TextSize": [],
    "Theme": [],
    "ThumbColorActive": [],
    "ThumbColorInactive": [],
    "ThumbEnabled": [],
    "ThumbPosition": [],
    "TimeInterval": [],
    "Timeout": [],
    "TimerAlwaysFires": ["alwaysfires"],
    "TimerEnabled": [],
    "TimerInterval": [],
    "Title": [],
    "TitleVisible": ["showtitle"],
    "Token": [],
    "TrackColorActive": [],
    "TrackColorInactive": [],
    "TransportationMethod": ["method"],
    "Url": [],
    "UseExternalScanner": ["externalscanner", "external"],
    "UsesLocation": ["uselocation", "location"],
    "UseLegacy": [],
    "UseSSL": [],
    "VersionCode": [],
    "VersionName": [],
    "Visible": [],
    "Volume": ["vol"],
    "WestLongitude": ["west"],
    "Width": [],
    "WritePermission": [],
    "X": [],
    "Y": [],
    "Z": [],
    "ZoomLevel": [],

    //extra connectivity attributes (I got lazy about alphabetising)
    "Action": [],
    "ActivityClass": [],
    "ActivityPackage": [],
    "DataType": [],
    "DataUri": [],
    "ExtraKey": [],
    "ExtraValue": [],
    "ResultName": []
}


//this helps name objects without a name
function* getNumber() {
    let count = 0
    while (true) {
        yield count
        count++
    }
}
let generator = getNumber();

function output(text) {
    if (logFile) { fs.appendFileSync("code.yail", text) }
    yail += text
}

//this is the heart of the operation
let yail = ""
let elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
let assetsList = []     //this is the list of media files that need to be loaded
let componentList = ''
let logFile = true

function main(filename = "temp.xml") {

    console.log()
    console.log(`Compiling screen yail for "${filename}"`)
    console.log(`*** Compiler messages ***`)

    yail = ""

    //delete base file
    if (logFile) { fs.writeFileSync("code.yail", "") }

    //get input
    let contents = fs.readFileSync(filename, "utf-8")

    //should catch errors in xml format and alert user
    let structure = JSON.parse(convert.xml2json(contents))
    elementList = []    //this is the list of elements on the page - needed so can create and activate them all later in the last line of code
    assetsList = []     //this is the list of media files that need to be loaded

    //if empty object returned then nothing in the file so crash out

    traverse(structure.elements[0])

    //add lines to execute build
    output(`\n(init-runtime)`)
    componentList = ''
    elementList.shift()  //kill first element - it is the root element of the JSON the CML is parsed
    for (let i = 0; i < elementList.length; i++) {
        componentList += `'${elementList[i]} `
    }
    output(`\n(call-Initialize-of-components ${componentList} )`)

    console.log(`*** End compiler messages ***`)
    console.log()

    return { yail: yail, assetsList: assetsList }
}

exports.for = main

function traverse(object, parent = '') {

    //must delete text objects or it falls apart
    if (object.type === 'text') { return }

    let type = object.name.toLowerCase()

    //handle attributes and default attributes
    if (object.attributes) {
        //convert all attributes to lowercase
        object.attributes = Object.fromEntries(
            Object.entries(object.attributes).map(([k, v]) => [k.toLowerCase(), v])
        );

        let attributes = object.attributes
        if (!attributes.name) {
            attributes.name = type + "_" + generator.next().value
        }
        //default screen attributes
        if (type === "screen") {
            if (typeof attributes.showlistsasjson === undefined) { attributes.showlistsasjson = "true" }
            if (typeof attributes.sizing === undefined) { attributes.sizing = "responsive" }
            if (typeof attributes.title === undefined) { attributes.title = "Screen1" }
            if (typeof attributes.appname === undefined) { attributes.appname = "Crazy Green Pencils" }
        }

    } else {
        object.attributes = {
            name: type + "_" + generator.next().value
        }
    }

    elementList.push(object.attributes.name)


    //for tables we need to do some basic error correct for columns and rows numbers for the table and the elements within
    if (type === "table") {
        //0. determine the size of the table
        let columns = 2
        let rows = 2

        if (object.attributes) {
            if (object.attributes.columns) {
                let setValue = parseInt(object.attributes.columns)
                if (isNaN(setValue)) {
                    console.log("*** Columns not a numerical integer value for a table, coercing to 2. ***")
                    object.attributes.columns = 2
                } else {
                    columns = setValue
                }
            }
            if (object.attributes.rows) {
                let setValue = parseInt(object.attributes.rows)
                if (isNaN(setValue)) {
                    console.log("*** Rows not a numerical integer value for a table, coercing to 2. ***")
                    object.attributes.rows = 2
                } else {
                    rows = setValue
                }
            }
        }

        /*
            1. iterate over the items and determine if the column and row numbers are valid
                -> determine minimum and maximum column
                    -> set number of columns to be max of (current column count, max column number, max range of column numbers (in case did a negative))
                    -> if negative column numbers then will need to determine this difference and update column number positions for the elements to be greater than/equal to zero
                -> do the same for rows
        */
        let minColumn = 0
        let maxColumn = 0
        let minRow = 0
        let maxRow = 0
        for (let i = 0; i < object.elements.length; i++) {
            let element = object.elements[i]
            if (element.attributes) {
                //convert attributes to lowercase
                element.attributes = Object.fromEntries(
                    Object.entries(element.attributes).map(([k, v]) => [k.toLowerCase(), v])
                );
                if (element.attributes.col) {
                    let col = parseInt(element.attributes.col)
                    if (isNaN(col)) {
                        delete element.attributes.col
                        console.log("*** Invalid column reference for table element. Deleting. ***")
                    } else {
                        if (col > maxColumn) { maxColumn = col }
                        if (col < minColumn) { minColumn = col }
                    }
                }
                if (element.attributes.row) {
                    let row = parseInt(element.attributes.row)
                    if (isNaN(row)) {
                        delete element.attributes.row
                        console.log("*** Invalid row reference for table element. Deleting. ***")
                    } else {
                        if (row > maxRow) { maxRow = row }
                        if (row < minRow) { minRow = row }
                    }
                }
            }
        }

        //need to account for the zero indexed columns and rows
        maxRow += 1
        maxColumn += 1
        let requiredCols = Math.max(maxColumn, columns, maxColumn - minColumn)
        if (requiredCols > columns) {
            console.log(`*** Table requires more columns, increasing from ${columns} to ${requiredCols} ***`)
            columns = requiredCols
            object.attributes.columns = `${columns}`
        }
        let requiredRows = Math.max(maxRow, rows, maxRow - minRow)
        if (requiredRows > rows) {
            console.log(`*** Table requires more rows, increasing from ${rows} to ${requiredRows} ***`)
            rows = requiredRows
            object.attributes.rows = `${rows}`
        }

        //if row or column indices are less than zero then need to adjust them
        //this should all work as cleaned these attributes earlier on by deleting invalid ones
        if (minRow < 0 || minColumn < 0) {
            for (let i = 0; i < object.elements.length; i++) {
                let element = object.elements[i]
                if (element.attributes) {
                    if (element.attributes.row) {
                        element.attributes.row = `${parseInt(element.attributes.row) - minRow}`
                    }
                    if (element.attributes.col) {
                        element.attributes.col = `${parseInt(element.attributes.col) - minColumn}`
                    }
                }
            }
        }

        /*
            2. check count of elements in list
                -> if too many elements than cells, add extra rows so that cells will be adequete in quantity
        */
        let elementCount = object.elements.length
        if (elementCount > rows * columns) {
            let requiredRows = Math.ceil(elementCount / columns)
            console.log(`*** Increasing table row count from ${rows} to ${requiredRows} to account for excess elements ***`)
            rows = requiredRows
            object.attributes.rows = `${rows}`
        }

        /*
            3. assign numbered elements to cells and set element as assigned
                -> if cell aready filled then leave second and subsequence as unassigned
        */
        let assignment = []
        for (let i = 0; i < rows; i++) { let r = []; for (j = 0; j < columns; j++) { r.push(0) }; assignment.push(r) }
        for (let i = 0; i < object.elements.length; i++) {
            let element = object.elements[i]
            if (element.attributes) {
                if (element.attributes.row && element.attributes.col) {
                    assignment[parseInt(element.attributes.row)][parseInt(element.attributes.col)] = 1
                    element.attributes.assigned = true //mark element so don't add it later on
                }
            }
        }

        /*
            4. iterate over unassigned elements and fill from the first available cell, assigning col and row to elements
                -> this might stuff up some ordering so doing it anyway
        */

        for (let i = 0; i < object.elements.length; i++) {
            let element = object.elements[i]
            if (element.attributes === undefined || element.attributes.assigned === undefined) {
                let vacantRow = 0
                let vacantColumn = 0
                while (assignment[vacantRow][vacantColumn] !== 0) {
                    vacantColumn++
                    if (vacantColumn === columns) {
                        vacantRow++
                        vacantColumn = 0
                    }
                }
                if (element.attributes == undefined) {
                    element.attributes = {}
                }
                element.attributes.row = `${vacantRow}`
                element.attributes.col = `${vacantColumn}`
                assignment[vacantRow][vacantColumn] = 1
            }
        }
    }    /////////// THIS IS THE END HANDLING TABLES ////////////

    //ball must have an X and Y
    if (type === "ball" || type === "sprite") {
        if (typeof object.attributes === undefined) {
            object.attributes = {}
        }
        if (typeof object.attributes.x === undefined) {
            object.attributes.x = 20
        }
        if (typeof object.attributes.y === undefined) {
            object.attributes.y = 20
        }
        if (isNaN(parseInt(object.attributes.x))) {
            object.attributes.x = 20
            console.log("Invalid ball position x. Setting to 20,")
        }
        if (isNaN(parseInt(object.attributes.y))) {
            object.attributes.y = 20
            console.log("Invalid ball position y. Setting to 20,")
        }
    }


    //create the elements
    if (Object.keys(ELEMENTS).indexOf(type) !== -1) {
        createElement(type, object.attributes, parent, object.elements)
    }

    //generate the assetList
    if (object.attributes) {
        for (const [key, value] of Object.entries(object.attributes)) {
            if (key !== "backgroundimage" && key !== "image") { continue; }
            assetsList.push(value)
        }
    }
    fs.writeFileSync("assets.list", JSON.stringify(assetsList))

    //traverse the children

    //TODO: only allow traversing on the elements that can actually have children
    /*if (object.elements) {
        for (let i = 0; i < object.elements.length; i++) {
            if (!object.name) {
                traverse(object.elements[i])
            } else {
                traverse(object.elements[i], object.attributes.name)
            }
        }
    }*/


    if (object.elements) {
        //determine if object can have children
        let objectswithChildren = ['screen', "hbox", "vbox", "hscrollbox", 'vscrollbox', 'table', 'canvas', 'map']
        if (objectswithChildren.indexOf(type) !== -1) {

            for (let i = 0; i < object.elements.length; i++) {
                //determine cases where children are limited
                let childname = object.elements[i].name.toLowerCase()
                let mapChildren = ["circle", "featurecollection", "linestring", "marker", "polygon", 'rectangle']
                if (type === 'map') {
                    if (mapChildren.indexOf(childname) === -1) {
                        console.log(`Element "Map" cannot have child of element type "${childname}". Ignoring.`)
                        continue
                    }
                } else {
                    if (mapChildren.indexOf(childname) !== -1) {
                        console.log(`Element "${childname}" can only be parented by a "Map" element. Ignoring.`)
                        continue
                    }
                }

                let canvasChildren = ["ball", "imagesprite"]
                if (type === 'canvas') {
                    if (canvasChildren.indexOf(childname) === -1) {
                        console.log(`Element "Canvas" cannot have child of element type "${childname}". Ignoring.`)
                        continue
                    }
                } else {
                    if (canvasChildren.indexOf(childname) !== -1) {
                        console.log(`Element "${childname}" can only be parented by a "Canvas" element. Ignoring.`)
                        continue
                    }
                }

                if (childname === "screen") {
                    console.log(`Cannot nest "Screen" elements. Ignoring.`)
                    continue;
                }


                if (!object.name) {
                    traverse(object.elements[i])
                } else {
                    traverse(object.elements[i], object.attributes.name)
                }
            }
        } else {
            console.log(`Element of type '${type}' cannot have child elements. Ignoring.`)
        }
    }

}


function createElement(element, attributes, parent, elements) {
    let template = `\n(add-component ${parent} com.google.appinventor.components.runtime.${ELEMENTS[element].runTimeName} ${attributes.name}`

    if (element === "screen") { //screen creation is a special case
        template = `\n(try-catch 
            (let 
                ((
                    attempt 
                        (delay 
                            (set-form-name "${attributes.name}")
                        )
                )) 
                (force attempt)
            ) 
            (exception java.lang.Throwable 'notfound)
        )
        \n(do-after-form-creation`
    }

    output(template)

    for (let [key, value] of Object.entries(attributes)) {
        //convert key (the attribute to lowercase)
        key = key.toLowerCase()
        //determine if the key is in the list for this element
        let legalAttributes = ELEMENTS[element].attributes
        if (legalAttributes.indexOf(key) !== -1) {

            //find correct name for the attribute for the SCHEME code
            for (let [attrkey, attrvalue] of Object.entries(ATTRIBUTES)) {
                if (attrkey.toLowerCase() === key || attrvalue.indexOf(key) !== -1) {
                    //process the attribute
                    setAttribute(key, value, attributes.name, attrkey)
                }
            }

        } else {
            console.log(`Invalid attribute "${key}" for "${element}", Ignoring.`)
        }


    }
    output(`\n)\n`)

}



///////////////////////////////////////////////////////////////////////////////
//// This section adds the actual lines of code for the various parameters ////
///////////////////////////////////////////////////////////////////////////////

function setAttribute(key, value, name, descriptor) {

    switch (descriptor) {
        case "AppName":
        case "Title":
        case "Hint":
        case "Prompt":
        case "ElementsFromString":
        case "AlternateText":
        case "HomeUrl":
        case "Text":
        case "Selection":
        case "Image":
        case "Picture":
        case "Source":
        case "SavedRecording":
        case "Country":
        case "Language":
        case "ApiKey":
        case "BackgroundImage":
        case "CenterFromString":
        case "Description":
        case "ImageAsset":
        case "PhoneNumber":
        case "Message":
        case "ConsumerKey":
        case "ConsumerSecret":
        case "ProjectID":
        case "RedisServer":
        case "Token":
        case "SourceFile":
        case "ApplicationName":
        case "CredentialsJSON":
        case "SpreadsheetID":
        case "Namespace":
        case "ServiceURL":
        case "Action":
        case "ActivityClass":
        case "ActivityPackage":
        case "DataType":
        case "DataUri":
        case "ExtraKey":
        case "ExtraValue":
        case "ResultName":
        case "CharacterEncoding":
        case "ResponseFileName":
        case "Url":
        case "Icon":
        case "AboutScreen":
        case "VersionName":
        case "HolePointsFromString":
        case "PointsFromString": //this is array of arrays of x,y - should be a convience method to load these better
            //e.g. [[68.02222323204114,-127.02117919921876],[68.01142776369724,-126.99234008789064]]
            setText(key, value, name, descriptor)
            break;
        case "TitleVisible":
        case "Enabled":
        case "ShowFeedback":
        case "ShowStatusBar":
        case "ThumbEnabled":
        case "FollowLinks":
        case "PromptForPermission":
        case "HasMargins":
        case "Visible":
        case "UseLegacy":
        case "Rotates":
        case "EnablePan":
        case "EnableZoom":
        case "UseExternalScanner":
        case "TimerAlwaysFires":
        case "TimerEnabled":
        case "ReadMode":
        case "UseSSL":
        case "Secure":
        case "ShowListsAsJSON":
            setFalse(key, value, name, descriptor)
            break;
        case "Checked":
        case "Clickable":
        case "FontBold":
        case "FontItalic":
        case "ScalePictureToFit":
        case "On":
        case "IgnoreSslErrors":
        case "UsesLocation":
        case "ShowFilterBar":
        case "NumbersOnly":
        case "HTMLFormat":
        case "MultiLine":
        case "ReadOnly":
        case "PlayOnlyInForeground":
        case "Loop":
        case "ExtendMovesOutsideCanvas":
        case "OriginAtCenter":
        case "EnableRotation":
        case "ShowCompass":
        case "ShowScale":
        case "ShowUser":
        case "ShowZoom":
        case "Draggable":
        case "EnableInfoBox":
        case "LegacyMode":
        case "KeepRunningWhenOnPause":
        case "GoogleVoiceEnabled":
        case "ReadPermission":
        case "WritePermission":
        case "HighByteFirst":
        case "DisconnectOnError":
        case "AllowCookies":
        case "SaveResponse":
        case "BigDefaultText":
        case "HighContrast":
        case "Scrollable":
            setTrue(key, value, name, descriptor)
            break;
        case "FontSize":
        case "TextSize":
        case "FontSizeDetail":
        case "RotationAngle":
        case "MaxValue":
        case "MinValue":
        case "ThumbPosition":
        case "Volume":
        case "Pitch":
        case "SpeechRate":
        case "LineWidth":
        case "Heading":
        case "Speed":
        case "X":
        case "Y":
        case "Z":
        case "Rotation":
        case "FillOpacity":
        case "Radius": //there are cases where this should be an integer - hope this doesn't break anything
        case "StrokeOpacity":
        case "StrideLength":
        case "Latitude":    //should be a special method to test for latitude and longitude correctness
        case "Longitude":
        case "StartLatitude":
        case "StartLongitude":
        case "EndLatitude":
        case "EndLongitude":
        case "NorthLatitude":
        case "SouthLatitude":
        case "EastLongitude":
        case "WestLongitude":
        case "PollingRate":
            setFloat(key, value, name, descriptor)
            break;
        case "BackgroundColor":
        case "TextColor":
        case "SelectionColor":
        case "ItemTextColor":
        case "TextColorDetail":
        case "ItemBackgroundColor":
        case "ColorLeft":
        case "ColorRight":
        case "ThumbColorActive":
        case "ThumbColorInactive":
        case "TrackColorActive":
        case "TrackColorInactive":
        case "PaintColor":
        case "FillColor":
        case "StrokeColor":
        case "AccentColor":
        case "PrimaryColor":
        case "PrimaryColorDark":
            setColor(key, value, name, descriptor)
            break;
        case "Columns":
        case "Rows":
        case "Column":
        case "Row":
        case "ImageHeight":
        case "ImageWidth":
        case "MinimumInterval":
        case "TapThreshold":
        case "Interval":
        case "ZoomLevel":
        case "StrokeWidth":
        case "RefreshTime":
        case "RedisPort":
        case "TimerInterval":
        case "TimeInterval":        //limit to 0, 1000, 10000, 60000, 300000 //should have this as timerinterval so not confuse users
        case "DistanceInterval":    ///limit to 0, 1, 10, 100
        case "StopDetectionTimeout":
        case "DelimiterByte":
        case "BaudRate":
        case "BufferSize":
        case "Timeout":
        case "VersionCode":
            setInteger(key, value, name, descriptor);
            break;
        case "Width":
        case "Height":
            setDimensions(key, value, name, descriptor);
            break;
        case "LocationSensor":
            setComponent(key, value, name, descriptor);
            break;
        case "FeaturesFromGeoJSON":
            setGeoJSONData(key, value, name, descriptor)
            break;
        case "DefaultScope":
            setScope(key, value, name, descriptor)
            break;
        case "CloseScreenAnimation":
        case "OpenScreenAnimation":
            fromTextList(key, value, name, ['fade', 'zoom', 'slidehorizontal', 'slidevertical', 'none'], descriptor)
            break;
        case "TransportationMethod":
            fromTextList(key, value, name, ['driving', 'cycling', 'wheelchair'], "TransportationMethod")
            break;
        case "ScreenOrientation":
            fromTextList(key, value, name, ['portrait', 'landscape', 'sensor', 'user'], "TransportationMethod")
            break;
        case "Sizing":
            fromTextList(key, value, name, ['fixed', 'responsive'], descriptor)
            break;
        case "Theme":
            fromTextList(key, value, name, ['devicedefault', 'blacktitle', 'dark'], descriptor)
            break;
        case "FontTypeface":
            fromList(key, value, name, ['sans serif', 'serif', 'monospace'], "FontTypeface")
            break;
        case "FontTypefaceDetail":
            fromList(key, value, name, ['sans serif', 'serif', 'monospace'], "FontTypefaceDetail")
            break;
        case "Shape":
            fromList(key, value, name, ['rounded', 'rectangular', 'oval'], "Shape")
            break;
        case "AlignVertical":
        case "AnchorVertical":
            fromList(key, value, name, ['top', 'center', 'bottom'], "AlignVertical")
            break;
        case "AlignHorizontal":
        case "AnchorHorizontal":
            fromList(key, value, name, ['left', 'right', 'center'], "AlignHorizontal")
            break;
        case "TextAlignment":
            fromList(key, value, name, ['left', 'center', 'right'], "TextAlignment")
            break;
        case "Orientation":
            fromList(key, value, name, ['vertical', 'horizontal'], "Orientation")
            break;
        case "NotifierLength":
            fromList(key, value, name, ['short', 'long'], "NotifierLength")
            break;
        case "ListViewLayout":
            fromList(key, value, name, ['text', 'text_detail', 'text_detail_horz', 'image_text', 'image_text_detail'], "ListViewLayout")
            break;
        case "MapType":
            fromList(key, value, name, ['roads', 'aerial', 'terrain'], "MapType")
            break;
        case "ScaleUnits":
            fromList(key, value, name, ['metric', 'imperial'], "ScaleUnits")
            break;
        case "Sensitivity":
            fromList(key, value, name, ['weak', 'moderate', 'strong'], "ScaleUnits")
            break;
        case "RecievingEnabled":
            fromList(key, value, name, ['off', 'foreground', 'always'], "ReceivingEnabled")
            break;
        case "ListData":
            loadListViewData(key, value, name, "ListData")
            break;
        case "Name":
        case "Id":      //for CSS styling
        case "Class":   //for CSS styling
            break;
        default:
            console.log(`Error: Unknown descriptor "${descriptor}". Ignoring.`)
    }

}



/////////////////////////////////////////////////////////
//// These are the master parameter creation methods ////
/////////////////////////////////////////////////////////

function setText(key, value, name, descriptor) {

    if (descriptor === "Country") {
        value = value.toUpperCase()
        let countries = ["AUS", "AUT", "BEL", "BLZ", "BWA", "CAN", "CHE", "DEU", "ESP", "FRA", "GBR", "HKG", "IND", "IRL", "ITA", "JAM", "LIE", "LUX", "MCO", "MHL", "MLT", "NAM", "NZL", "PAK", "PHL", "SGP", "TTO", "USA", "VIR", "ZAF", "ZWE"]
        if (countries.indexOf(value) === -1) {
            console.log("Invalid country in speech recognizer. Ignoring.")
            return
        }
    }
    if (descriptor === "Language") {
        value = value.toLowerCase()
        let languages = ["en", "de", "es", "fr", "it"]
        if (languages.indexOf(value) === -1) {
            console.log("Invalid language in speech recognizer. Ignoring.")
            return
        }
    }



    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`)
}

function setFalse(key, value, name, descriptor) {
    value = value.toLowerCase().trim()
    if (value === "false" || value === "f") {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`)
    } else {
        console.log(`${descriptor} requires a value to "false" or "f" to change from default state.`)
    }
}

function setTrue(key, value, name, descriptor) {
    value = value.toLowerCase().trim()
    if (value === "true" || value === "t") {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} #f 'boolean)`)
    } else {
        console.log(`${descriptor} requires a value to "true" or "t" to change from default state.`)
    }
}

function setFloat(key, value, name, descriptor) {
    value = parseFloat(value)
    if (!isNaN(value)) {
        if (descriptor === "StokeOpacity") {
            if (value < 0) { value = 0 }
            if (value > 1) { value = 1 }
        } else if (descriptor.includes("Longitude")) {
            while (value < -180) { value += 360 }
            while (value > 180) { value -= 360 }
        } else if (descriptor.includes("Latitude")) {
            while (value < -90) { value += 180 }
            while (value > 90) { value -= 180 }
        }
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    } else {
        console.log(`${descriptor} requires a numerical value as input.`)
    }
}

function setInteger(key, value, name, descriptor) {
    value = parseInt(value)
    if (!isNaN(value)) {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    } else {
        console.log(`${descriptor} requires an integer value as input.`)
    }
}



function setComponent(key, value, name, descriptor) {
    //somehow need to validate that the component actually exists.....
    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} (get-component ${value}) 'component)`)
}

function fromList(key, value, name, options, descriptor) {
    if (options.includes(value.toLowerCase())) {
        let index = options.indexOf(value) + 1

        //special case
        if (descriptor === "TextAlignment" || descriptor === "ListViewLayout") { index-- }
        if (descriptor === "Orientation") { if (index !== 1) { return } } //only send through request for horizonatal, vertical is default
        if (descriptor === "NotifierLength") { if (index !== 0) { return } } //only send through request for short, long is default
        if (descriptor === "MapType" || descriptor === "ScaleUnits") { if (index === 0) { return } }
        if (descriptor === "Sensitivity") { if (index === 2) { } return }

        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${index} 'number)`)
    } else {
        console.log(`${descriptor} value of "${value}" is invalid for this descriptor.`)
    }
}

function setColor(key, value, name, descriptor) {
    if (value.length !== 8) {
        console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. Found value does not have 8 characters - "${value}" ***`)
        return
    }
    value = value.toUpperCase()
    for (let i = 0; i < value.length; i++) {
        let ch = value[i];
        if ((ch < '0' || ch > '9') &&
            (ch < 'A' || ch > 'F')) {
            console.log(`Invalid colour for ${descriptor}. Must be 8 digit hexadecimal string. A non-valid hexadecimal character was found - "${ch}" ***`)
            return;
        }
    }

    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} #x${value} 'number)`)
}

function setDimensions(key, value, name, descriptor) {
    if (value === 'parent') {
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} -2 'number)`)
        return
    }
    if (value.indexOf('%') !== -1) {  //handle percentage
        value = value.replaceAll("%", "").trim()
        value = parseInt(value)
        if (isNaN(value)) {
            console.log(`${descriptor} value set is invalid.`)
            return;
        }
        if (value > 100) { value = 100 }
        if (value < 0) { value = 0 }
        value += 1000
        value = -value
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    } else { //pixels
        value = parseInt(value)
        if (isNaN(value)) {
            console.log(`${descriptor} value set is invalid.`)
            return;
        }
        if (value < 0) { value = 0 }
        output(`\n\t(set-and-coerce-property! '${name} '${descriptor} ${value} 'number)`)
    }
}


function loadListViewData(key, value, name, descriptor) {
    //load the data from a CSV file 
    let file = fs.readFileSync(value, 'utf-8')
    let data = file.split("\n")

    let datalist = []

    while (typeof data[0] !== "undefined") {
        let d = data.shift()
        let line = d.split(",")
        let object = {}
        if (typeof line[0] !== 'undefined') { object.Text1 = line[0].trim() }
        if (typeof line[1] !== 'undefined') { object.Text2 = line[1].trim() }
        if (typeof line[2] !== 'undefined') { object.Image = line[2].trim() }
        datalist.push(object)
    }

    let outputText = JSON.stringify(datalist)
    outputText = outputText.replaceAll('"', '\\"')

    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${outputText}" 'text)`)
}

function fromTextList(key, value, name, options, descriptor) {
    value = value.toLowerCase()
    if (descriptor === "TransportationMethod") {
        if (value === "driving") { value = "driving-car" }
        else if (value === "cycling-regular") { value = "cycling" }
        else if (value === "wheelchair") { }
        else {
            console.log(`Transportation method set to "Walking": either not supplied or invalid method given.`)
            return
        }
    }
    if (descriptor === "CloseScreenAnimation" || descriptor === "OpenScreenAnimation") {
        if (options.indexOf(value) === -1) {
            console.log(`Invalid option given for Open/Close Screen Animation: setting to default.`)
            return
        }
    }
    if (descriptor === "ScreenOrientation") {
        if (options.indexOf(value) === -1) {
            console.log(`Invalid option given for Screen Orientation: setting to default.`)
            return
        }
    }
    if (descriptor === "Sizing") {
        if (options.indexOf(value) === -1) {
            value = "responsive"
            console.log(`Invalid option given for Sizing (of screen): setting to responsive.`)
        }
    }
    if (descriptor === "Theme") {
        if (value === "devicedefault") { value = "AppTheme.Light.DarkActionBar" }
        else if (value === "blacktitle") { value = "AppTheme.Light" }
        else if (value === "dark") { value = "AppTheme" }
        else {
            console.log("Invalid value for theme (of screen): setting to 'classic'.")
            return
        }
    }
    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'text)`)
}

function setScope(key, value, name, options, descriptor) {
    value = value.toLowerCase()
    let options2 = ["asset", "cache", "legacy", "private", "shared"]
    if (options2.indexOf(value) === -1) {
        console.log("Invalid default scope for data file. Ignoring.")
        return
    }
    value = value[0].toUpperCase() + value.substring(1)
    output(`\n\t(set-and-coerce-property! '${name} '${descriptor} "${value}" 'com.google.appinventor.components.common.FileScopeEnum)`)
}

function setGeoJSONData(key, value, name, descriptor) {
    //TODO - load the data from the GeoJSON file, somehow apply 

}