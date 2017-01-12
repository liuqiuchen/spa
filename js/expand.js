Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

Array.prototype.arrMap = function (fn, context) {	// 兼容IE9以下
    context = context || window;
    var ary = [];
    if (Array.prototype.map) {
        ary = this.map(fn, context);
    } else {
        for (var i = 0; i < this.length; i++) {
            ary[i] = fn.apply(context, [this[i], i, this]);
        }
    }
    return ary;
}