$(document).ready( function() {

    function makeSVG(tag, attribs, value)
    {
        if (attribs == null) {
            attribs = {};
        }

        var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attribs) {
            el.setAttribute(k, attribs[k]);
        }

        if (value) {
            value = document.createTextNode(value);
            el.appendChild(value);
        }
        return el;
    }

    function sprintf(format, etc) {
        var arg = arguments;
        var i = 1;
        return format.replace(/%((%)|s)/g, function (m) { return m[2] || arg[i++] })
    }

    ngm = {
        /* defaults */
        systemsize: 50, // units
        fieldsize: 10, // pixel
        width: 700,
        height: 700,

        /**
         * calculate and (re)positioning the field selector
         *
         * @param e  mouseclick event
         * @return coords
         */
        toggleSelect: function (e) {
            range = ngm.range;
            scale = ngm.scale;
            xMin = Math.floor(ngm.coordx - ngm.range/2);
            yMin = Math.floor(ngm.coordy - ngm.range/2);

            map_offset_left = Math.floor($(ngm.selector).offset().left);
            map_offset_top  = Math.floor($(ngm.selector).offset().top);
            center_svg_left = Math.floor($(ngm.selector + " .grid-svg:nth(4)").offset().left);
            center_svg_top  = Math.floor($(ngm.selector + " .grid-svg:nth(4)").offset().top);

            x = xMin + Math.floor((e.pageX - center_svg_left) / scale);
            y = yMin + Math.floor((e.pageY - center_svg_top) / scale);

            left = center_svg_left + (x - xMin) * scale - map_offset_left;
            top_ = center_svg_top  + (y - yMin) * scale - map_offset_top;

            $(ngm.selector + ' #field-selector').remove();
            $(ngm.selector).append('<div id="field-selector" style="top:'+top_+'px; left:'+left+'px; width:'+scale+'px; height:'+scale+'px;"><!-- --></div>');

            return '['+x+','+y+',0]';
        },

        /**
         * create a new svg dom element and position it in the right direction
         *
         * @param direction north|east|south|west
         */
        createGridSVGDom: function(direction) {
            var tpl = '<svg class="grid-svg %s" width="%spx" height="%spx" style="margin-left: %spx; margin-top: %spx;"></svg>'
            var width  = ngm.range * ngm.scale;
            var height = ngm.range * ngm.scale;

            var halfwidth  = Math.floor(width/2);
            var halfheight = Math.floor(height/2);

            switch (direction) {
                case 'north-east':
                    class_ = 'grid-north grid-east';
                    margin_left = halfwidth;
                    margin_top = -height-halfheight;
                    break;
                case 'east':
                    class_ = 'grid-east';
                    margin_left = halfwidth;
                    margin_top = -halfheight;
                    break;
                case 'south-east':
                    class_ = 'grid-south grid-east';
                    margin_left = halfwidth;
                    margin_top = halfheight;
                    break;
                case 'north-west':
                    class_ = 'grid-north grid-west';
                    margin_left = -width-halfwidth;
                    margin_top  = -height-halfheight;
                    break;
                case 'west':
                    class_ = 'grid-west';
                    margin_left = -width-halfwidth;
                    margin_top  = -halfwidth;
                    break;
                case 'south-west':
                    class_ = 'grid-south grid-west';
                    margin_left = -width-halfwidth;
                    margin_top  = halfheight;
                    break;
                case 'north':
                    class_ = 'grid-north';
                    margin_left = -halfwidth;
                    margin_top  = -height-halfheight;
                    break;
                case 'south':
                    class_ = 'grid-south';
                    margin_left = -halfwidth;
                    margin_top  = halfheight;
                    break;
                case 'center':
                    class_ = '';
                    margin_left = -halfwidth;
                    margint_top = -halfheight;
                default:
                    break;
            }

            //console.log(class_, width, height, margin_left, margin_top);
            return sprintf(tpl, class_, width, height, margin_left, margin_top);
        },
        setNewCenterCoords: function(coordx, coordy) {
            // TODO: complete reload of all SVG maps with new coords as center
        },
        loadMapDataInArea: function(xymin, xymax) {
            // currently use of dummy data
            // TODO: data should be loaded by ajax request
/*            var result = $.getJSON( "file:///D:/htdocs/nouron_galaxy_map/dummydata.json");

            console.log(result.responseJSON);
            data = result.responseJSON;
            console.log(data);*/

/*            data = $.ajax({
              dataType: 'jsonp',
              //data: 'id=10',
              jsonp: 'jsonp_callback',
              url: "file:///D:/htdocs/nouron_galaxy_map/dummydata.json",//"http://tector.github.io/ngm/dummydata.json",
              success: function (t) {
                tmp = t['data'];
              }
            });*/

            data = [
                // north-west
                {'layer': 1, 'x': 1199, 'y': 1199, 'attribs':{'title':'nw-test', 'class': 'planet'}},
                // north
                {'layer': 1, 'x':1225, 'y':1195, 'attribs':{'title':'north-test', 'class': 'planet'}},
                // north-east
                {'layer': 1, 'x': 1251, 'y': 1199, 'attribs':{'title':'ne-test', 'class': 'planet'}},
                // west
                {'layer': 1, 'x': 1195, 'y': 1225, 'attribs':{'title':'west-test', 'class': 'planet'}},
                // center
                {'layer': 1, 'x': 1210, 'y': 1222, 'attribs':{'title':'test', 'class': 'planet'}},
                {'layer': 1, 'x': 1211, 'y': 1222, 'attribs':{'title':'test', 'class': 'planet'}},
                {'layer': 1, 'x': 1212, 'y': 1222, 'attribs':{'title':'test', 'class': 'planet'}},
                {'layer': 1, 'x': 1213, 'y': 1222, 'attribs':{'title':'test', 'class': 'planet'}},
                {'layer': 1, 'x': 1214, 'y': 1222, 'attribs':{'title':'test', 'class': 'planet'}},
                {'layer': 1, 'x': 1234, 'y': 1234, 'attribs':{'title':'test2', 'class': 'planet'}},
                {'layer': 2, 'x': 1230, 'y': 1210, 'attribs':{'title':'a station', 'class': 'station'}},
                // east
                {'layer': 1, 'x': 1254, 'y': 1217, 'attribs':{'title':'east-test', 'class': 'planet'}},
                {'layer': 0, 'x': 1251, 'y': 1243, 'attribs':{'title':'debris field', 'class': 'debris'}},
                {'layer': 0, 'x': 1253, 'y': 1243, 'attribs':{'title':'asteroid field', 'class': 'asteroids'}},
                {'layer': 0, 'x': 1253, 'y': 1245, 'attribs':{'title':'mine field', 'class': 'mines'}},
                {'layer': 0, 'x': 1254, 'y': 1247, 'attribs':{'title':'nebular', 'class': 'nebular'}},
                // south-west
                {'layer': 1, 'x': 1199, 'y': 1251, 'attribs':{'title':'south-west test', 'class': 'planet'}},
                // south
                {'layer': 1, 'x': 1225, 'y':1255, 'attribs':{'title':'south test', 'class': 'planet'}},
                // south-east
                {'layer': 1, 'x': 1255, 'y': 1255, 'attribs':{'title':'south-east test', 'class': 'planet'}},
            ]
            return data.filter(function(el){
                return (el.y >= xymin[1] && el.y < xymax[1]
                    && el.x >= xymin[0] && el.x < xymax[0]);
            });
        },

        /**
         * load data for one svg map:
         *
         *        -25
         *         ^
         * -25 <- x,y -> +25
         *         v
         *        +25
         *
         * load data for 9 svg maps:
         *
         *        -75
         *         ^
         * -75 <- x,y -> +75
         *         v
         *        +75
         *
         * @param {number} coordx
         * @param {number} coordy
         * @return array
         */
        loadMapDataByCoords: function(coordx, coordy, initfullmap = false) {
            if (initfullmap == true) {
                data = ngm.loadMapDataInArea([coordx-ngm.range*1.5, coordy-ngm.range*1.5], [coordx+ngm.range*1.5,coordy+ngm.range*1.5]);
            } else {
                data = ngm.loadMapDataInArea([coordx-ngm.range*0.5, coordy-ngm.range*0.5], [coordx+ngm.range*0.5,coordy+ngm.range*0.5]);
            }
            return data;
        },
        /**
         * initialize whole map for first time
         * create nine separate svg dom elements which are filled with loaded data
         *
         * @param config: array of configuration options
         */
        init: function(config) {
            ngm.selector = config['selector'];
            ngm.width  = config['width'];
            ngm.height = config['height'];
            ngm.coordx = config['center'][0];
            ngm.coordy = config['center'][1];
            ngm.scale = parseInt(config['scale']);
            ngm.range = parseInt(config['range']);
            ngm.layers = config['layers'];
            var map = $(ngm.selector);

            map.attr('style', 'width:'+ngm.width+';height:'+ngm.height+';position:absolute');

            data_north_west = ngm.loadMapDataByCoords(ngm.coordx-ngm.range, ngm.coordy-ngm.range);
            data_north      = ngm.loadMapDataByCoords(ngm.coordx, ngm.coordy-ngm.range);
            data_north_east = ngm.loadMapDataByCoords(ngm.coordx+ngm.range, ngm.coordy-ngm.range);

            map.append(ngm.createGridSVGDom('north-west'));
            ngm.fillWithContent('north-west', data_north_west);
            map.append(ngm.createGridSVGDom('north'));
            ngm.fillWithContent('north', data_north);
            map.append(ngm.createGridSVGDom('north-east'));
            ngm.fillWithContent('north-east', data_north_east);

            data_west   = ngm.loadMapDataByCoords(ngm.coordx-ngm.range, ngm.coordy);
            data_center = ngm.loadMapDataByCoords(ngm.coordx, ngm.coordy);
            data_east   = ngm.loadMapDataByCoords(ngm.coordx+ngm.range, ngm.coordy);

            map.append(ngm.createGridSVGDom('west'));
            ngm.fillWithContent('west', data_west);
            map.append(ngm.createGridSVGDom('center'));
            ngm.fillWithContent('center', data_center);
            map.append(ngm.createGridSVGDom('east'));
            ngm.fillWithContent('east', data_east);

            data_south_west = ngm.loadMapDataByCoords(ngm.coordx-ngm.range, ngm.coordy+ngm.range);
            data_south      = ngm.loadMapDataByCoords(ngm.coordx, ngm.coordy+ngm.range);
            data_south_east = ngm.loadMapDataByCoords(ngm.coordx+ngm.range, ngm.coordy+ngm.range);

            map.append(ngm.createGridSVGDom('south-west'));
            ngm.fillWithContent('south-west', data_south_west);
            map.append(ngm.createGridSVGDom('south'));
            ngm.fillWithContent('south', data_south);
            map.append(ngm.createGridSVGDom('south-east'));
            ngm.fillWithContent('south-east', data_south_east);

            map.append('<div id="push-north" class="grid-push grid-push-north">&#x25B2;</div>');
            map.append('<div id="push-west" class="grid-push grid-push-west">&#x25C0;</div>');
            map.append('<div id="push-east" class="grid-push grid-push-east">&#x25B6;</div>');
            map.append('<div id="push-south" class="grid-push grid-push-south">&#x25BC;</div>');

            $(ngm.selector + ' .grid-push').on('click', function(e) {
                e.preventDefault();
                var id = $(this).attr('id');
                console.log(id);
                switch (id) {
                    case 'push-east':
                        $(ngm.selector + ' .grid-svg').each(function(){
                            var left = parseInt($(this).css('margin-left').replace('px', ''));
                        });
                        ngm.addSystems('east');
                        break;
                    case 'push-west':
                        $(ngm.selector + ' .grid-svg').each(function(){
                            var left = parseInt($(this).css('margin-left').replace('px', ''));
                        });
                        ngm.addSystems('west');
                        break;
                    case 'push-north':
                        $(ngm.selector + ' .grid-svg').each(function(){
                            var top = parseInt($(this).css('margin-top').replace('px', ''));
                        });
                        ngm.addSystems('north');
                        break;
                    case 'push-south':
                        $(ngm.selector + ' .grid-svg').each(function(){
                            var top = parseInt($(this).css('margin-top').replace('px', ''));
                        });
                        ngm.addSystems('south');
                        break;
                    default:
                        break;
                }
            });

            $(".grid-svg").on('click', function(e) {
                coords = ngm.toggleSelect(e);
                console.log(coords);
            });

        },
        /**
         *
         * @param direction north|east|south|west
         * @param data
         */
        fillWithContent: function(direction, data) {

            switch (direction) {
                case 'north-east':
                    var targetsvg = $('.grid-north.grid-east');
                    break;
                case 'east':
                    var targetsvg = $('.grid-east').not('.grid-north')
                                                   .not('.grid-south');
                    break;
                case 'south-east':
                    var targetsvg = $('.grid-south.grid-east');
                    break;
                case 'north-west':
                    var targetsvg = $('.grid-north.grid-west');
                    break;
                case 'west':
                    var targetsvg = $('.grid-west').not('.grid-north')
                                                   .not('.grid-south');
                    break;
                case 'south-west':
                    var targetsvg = $('.grid-south.grid-west');
                    break;
                case 'north':
                    var targetsvg = $('.grid-north').not('.grid-west')
                                                    .not('.grid-east');
                    break;
                case 'south':
                    var targetsvg = $('.grid-south').not('.grid-west')
                                                    .not('.grid-east');
                    break;
                case 'center':
                    var targetsvg = $('.grid-svg').not('.grid-north')
                                                .not('.grid-east')
                                                .not('.grid-south')
                                                .not('.grid-west');
                default:
                    break;
            }

            ngm.drawGrid(targetsvg[0]);
            var test = ngm.layers;

            for (i=0; i<ngm.layers.length; i++) {
                var objects = data.filter(function(elem){return elem.layer==i})
                ngm.drawLayerObjects(targetsvg[0], ngm.layers[i], objects);
            }
        },
        /**
         * draw basic grid for one svg dom element
         *
         * @param targetDomElement  svg dom element to draw inside
         */
        drawGrid: function(targetDomElement)
        {
            max = Math.floor(ngm.range/10) * ngm.scale;

            // horizontal lines
            var group = makeSVG('g', {'class': 'ngm-grid-layer'});
            for (var i=0; i<10; i++)
            {
                var params = {
                    x1: 0,
                    y1: i*max,
                    x2: ngm.range*ngm.scale,
                    y2: i*max,
                    stroke: '#222222',
                    'stroke-width': '1px',
                    'fill-opacity':'0'
                };
                group.appendChild(makeSVG('line', params));
            }

            // vertical lines
            for (var j=0; j<10; j++)
            {
                var params = {
                    x1: j*max,
                    y1: 0,
                    x2: j*max,
                    y2: ngm.range*ngm.scale,
                    stroke: '#222222',
                    'stroke-width': '1px',
                    'fill-opacity':'0'
                };
                group.appendChild(makeSVG('line', params));
            }

            targetDomElement.appendChild(group);

        },
        /**
         *
         * @param targetDomElement
         * @param layerConfig
         * @param layerObjects
         */
        drawLayerObjects: function(targetDomElement, layerConfig, layerObjects)
        {
            var group = makeSVG('g', {'class': layerConfig['class']});
            if (layerConfig['objectDefaultShape'] == 'circle') {
                for (var i=0; i<layerObjects.length; i++) {
                    var r = Math.floor(ngm.scale/2);
                    var attribs = layerObjects[i]['attribs'];
                    var params = {
                        'title': attribs['title']+'('+layerObjects[i]['x']+','+layerObjects[i]['y']+')',
                        'cx': parseInt(layerObjects[i]['x']) % ngm.range*ngm.scale+r,
                        'cy': parseInt(layerObjects[i]['y']) % ngm.range*ngm.scale+r,
                        'r':  r,
                        'fill': '#9999bb',
                        'class': attribs['class']
                    }
                    group.appendChild(makeSVG('circle', params));
                }
            } else {
                for (var i=0; i<layerObjects.length; i++) {
                    var attribs = layerObjects[i]['attribs'];
                    var params = {
                        'title': attribs['title'],
                        'x': parseInt(layerObjects[i]['x']) % ngm.range*ngm.scale,
                        'y': parseInt(layerObjects[i]['y']) % ngm.range*ngm.scale,
                        'width': ngm.scale,
                        'height': ngm.scale,
                        'fill': 'grey',
                        'class': attribs['class']
                    }
                    group.appendChild(makeSVG('rect', params));
                }
            }
            targetDomElement.appendChild(group);
        },
        /**
         * this will load and add new systems (3 at a time) for the given direction
         *
         * @param direction north|east|south|west
         */
        addSystems: function(direction) {
            var map = $(ngm.selector);

            var delta = ngm.range

            if (direction == 'east') {
                $('.grid-svg').animate({marginLeft: "-="+delta*ngm.scale+'px'}, 500);
                $(ngm.selector+' #field-selector').animate({marginLeft: "-="+delta*ngm.scale+'px'}, 500);
                ngm.coordx = ngm.coordx+delta;
                console.log('new center xy:', ngm.coordx, ngm.coordy);

                setTimeout(function() {
                    // delete west
                    $('.grid-west').remove();
                    // center -> west
                    var elements = document.querySelectorAll('.grid-svg:not(.grid-west):not(.grid-east)');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass + ' grid-west';
                        elements[i].setAttribute('class', newclass);
                    }
                    // east -> center
                    var elements = document.querySelectorAll('.grid-east');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass.replace('grid-east', '')
                                               .replace('  ', ' ');
                        elements[i].setAttribute('class', newclass);
                    }
                    // create new
                    data_north_east = ngm.loadMapDataByCoords(ngm.coordx+delta, ngm.coordy-delta);
                    data_east       = ngm.loadMapDataByCoords(ngm.coordx+delta, ngm.coordy);
                    data_south_east = ngm.loadMapDataByCoords(ngm.coordx+delta, ngm.coordy+delta);

                    map.append(ngm.createGridSVGDom('north-east'));
                    ngm.fillWithContent('north-east', data_north_east);
                    map.append(ngm.createGridSVGDom('east'));
                    ngm.fillWithContent('east', data_east);
                    map.append(ngm.createGridSVGDom('south-east'));
                    ngm.fillWithContent('south-east', data_south_east);

                }, 500);

            } else if (direction == 'west') {

                $('.grid-svg').animate({marginLeft: "+="+delta*ngm.scale+'px'}, 500);
                $(ngm.selector+' #field-selector').animate({marginLeft: "+="+delta*ngm.scale+'px'}, 500);
                ngm.coordx = ngm.coordx-delta;
                console.log('new center xy:', ngm.coordx, ngm.coordy);
                setTimeout(function() {
                    // delete east
                    $('.grid-east').remove();
                    // center -> east
                    var elements = document.querySelectorAll('.grid-svg:not(.grid-west):not(.grid-east)');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass + ' grid-east';
                        elements[i].setAttribute('class', newclass);
                    }
                    // west -> center
                    var elements = document.querySelectorAll('.grid-west');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass.replace('grid-west', '')
                                               .replace('  ', ' ');
                        elements[i].setAttribute('class', newclass);
                    }

                    // create new
                    data_north_west = ngm.loadMapDataByCoords(ngm.coordx-delta, ngm.coordy-delta);
                    data_west       = ngm.loadMapDataByCoords(ngm.coordx-delta, ngm.coordy);
                    data_south_west = ngm.loadMapDataByCoords(ngm.coordx-delta, ngm.coordy+delta);

                    map.append(ngm.createGridSVGDom('north-west'));
                    ngm.fillWithContent('north-west', data_north_west);
                    map.append(ngm.createGridSVGDom('west'));
                    ngm.fillWithContent('west', data_west);
                    map.append(ngm.createGridSVGDom('south-west'));
                    ngm.fillWithContent('south-west', data_south_west);

                }, 500);

            } else if (direction == 'north') {

                $('.grid-svg').animate({marginTop: "+="+delta*ngm.scale+'px'}, 500);
                $(ngm.selector+' #field-selector').animate({marginTop: "+="+delta*ngm.scale+'px'}, 500);
                ngm.coordy = ngm.coordy-delta;
                console.log('new center xy:', ngm.coordx, ngm.coordy);
                setTimeout(function() {
                    // delete south
                    $('.grid-south').remove();

                    // center -> south
                    var elements = document.querySelectorAll('.grid-svg:not(.grid-north):not(.grid-south)');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass + ' grid-south';
                        elements[i].setAttribute('class', newclass);
                    }
                    // north -> center
                    var elements = document.querySelectorAll('.grid-north');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass.replace('grid-north', '')
                                               .replace('  ', ' ');
                        elements[i].setAttribute('class', newclass);
                    }

                    // create new
                    data_north_west = ngm.loadMapDataByCoords(ngm.coordx-delta, ngm.coordy-delta);
                    data_north      = ngm.loadMapDataByCoords(ngm.coordx, ngm.coordy-delta);
                    data_north_east = ngm.loadMapDataByCoords(ngm.coordx+delta, ngm.coordy-delta);

                    map.append(ngm.createGridSVGDom('north-west'));
                    ngm.fillWithContent('north-west', data_north_west);
                    map.append(ngm.createGridSVGDom('north'));
                    ngm.fillWithContent('north', data_north);
                    map.append(ngm.createGridSVGDom('north-east'));
                    ngm.fillWithContent('north-east', data_north_east);
                }, 500);

            } else if (direction == 'south') {

                $('.grid-svg').animate({marginTop: "-="+delta*ngm.scale+'px'}, 500);
                $(ngm.selector+' #field-selector').animate({marginTop: "-="+delta*ngm.scale+'px'}, 500);
                ngm.coordy = ngm.coordy+delta;
                console.log('new center xy:', ngm.coordx, ngm.coordy);
                setTimeout(function() {
                    // delete north
                    $('.grid-north').remove();

                    // center -> north
                    var elements = document.querySelectorAll('.grid-svg:not(.grid-north):not(.grid-south)');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass + ' grid-north';
                        elements[i].setAttribute('class', newclass);
                    }
                    // south -> center
                    var elements = document.querySelectorAll('.grid-south');
                    for (var i=0; i<elements.length; i++) {
                        var oldclass = elements[i].getAttribute('class');
                        var newclass = oldclass.replace('grid-south', '')
                                               .replace('  ', ' ');
                        elements[i].setAttribute('class', newclass);
                    }

                    // create new
                    data_south_west = ngm.loadMapDataByCoords(ngm.coordx-delta, ngm.coordy+delta);
                    data_south      = ngm.loadMapDataByCoords(ngm.coordx, ngm.coordy+delta);
                    data_south_east = ngm.loadMapDataByCoords(ngm.coordx+delta, ngm.coordy+delta);

                    map.append(ngm.createGridSVGDom('south-west'));
                    ngm.fillWithContent('south-west', data_south_west);
                    map.append(ngm.createGridSVGDom('south'));
                    ngm.fillWithContent('south', data_south);
                    map.append(ngm.createGridSVGDom('south-east'));
                    ngm.fillWithContent('south-east', data_south_east);
                }, 500);
            }
        },
        removeSystem: function(direction) {

        }

    }

});
