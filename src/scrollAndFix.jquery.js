(function ($) {

    $.fn.tireosScrollAndFix = function (options) {
        var settings = $.extend({
            "parent": "",
            "offset": "",
            "offsetbonus": 0
        }, options);

        return this.each(function () {

            // провеяем, инициализировали ли этот селектор
            if ($(this).data("init") !== "Y") {
                $(this).data("init", "Y");
            } else {
                return
            }

            var _this = {item: {}, parent: {}, offset: {}};

            _this.item.obj = $(this);              // элемент который будем фиксировать
            _this.parent.obj = options.parent;  // родительский элемент по которому будем фиксировать
            _this.offsetbonus = options.offsetbonus;
            _this.offset = options.offset + _this.offsetbonus;

            // рассчитываем статичные величины

            init(_this);

            // ставим объект
            putItem(_this);

            // ставим объект
            $(document).on("scroll", function () {
                putItem(_this);
            });

            // рассчитываем статичные величины
            $(window).on("resize", function () {
                init(_this);
            });
        });

        //Высичсляем постоянные величины
        function init(_this) {
            _this.item.height = _this.item.obj.height();

            _this.parent.height = _this.parent.obj.height();
            _this.parent.offset = _this.parent.obj.offset();
        }

        // Ставим блоки на место
        function putItem(_this) {
            var documentScrollTop = $(document).scrollTop(),
                margin = documentScrollTop - _this.parent.offset.top +  _this.offset;

            if (_this.parent.height < margin + _this.item.height) {
                /** fix block*/
                _this.item.obj.css({
                    "margin-top": _this.parent.height - _this.item.height + "px"
                }).addClass("is-bottom-fixed");
            }
            else if (_this.parent.offset.top - _this.offsetbonus < documentScrollTop) {
                /** slide block*/
                _this.item.obj.css({
                    "margin-top": margin + "px"
                }).removeClass("is-bottom-fixed");
            } else {
                /** dont shift*/
                _this.item.obj.css({
                    "margin-top": "0px"
                }).removeClass("is-bottom-fixed");
            }
        }
    };

})(jQuery);