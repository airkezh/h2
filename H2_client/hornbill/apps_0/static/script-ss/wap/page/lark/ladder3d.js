/*common*/
require('wap/jquery');

//生成椭圆曲线的点（数组）
			function make_points(a, b, interval, addX, addY) {
					var x, y;
					var xy = [],
						xy1 = [],
						xy2 = [];
					addX = addX ? addX : a;
					addY = addY ? addY : b;
					x = -Math.sqrt((b * b) * a * a / (b * b));
					for (var n = 0; 1; n++) {
						y = Math.sqrt(b * b - (b * b * x * x) / (a * a));
						if(n === 0){
							y0 = y;
						}
						xy1[n] = [x + addX, y + addY];
						//n++;
						xy2[n] = [x + addX, -y + addY];
						x = x + interval;
						if (x > Math.sqrt((b * b) * a * a / (b * b))) {
							break;
						}
					}
					//xy2倒序
					/*
					xy2 = xy2.sort(function(x,y){
						return x == y ? 0 : (x > y ? -1 : 1);
					});
					*/
					for (var n = 0, n2 = len = xy2.length - 1; n <= len; n++, n2--) {
						xy[n] = xy2[n2];
					}
					xy = xy1.concat(xy);
					return xy;
				}
				//画椭圆曲线

			function draw_oval(points) {
					var len = points.length;
					var divs = '';
					for (var n = 0; n < len; n++) {
						divs += '<div class="points" style="left:' + points[n][0] + 'px;top:' + points[n][1] + 'px;"></div>';
					}
					return divs;
				}
				//沿着曲线运动

			function go_oval(idd, points, n, t, addX, addY) {
				var len = points.length;
				n = n ? n : 0;
				t = t ? t : 10;
				addX = addX ? addX : 0;
				addY = addY ? addY : 0;
				var $obj = $(idd);
				$obj.css('left', points[n][0] + addX + 'px');
				$obj.css('top', points[n][1] + addY + 'px');
				n--;
				console.log(n);
				n = n == len ? 0 : n;
				if (n > 300) {
					setTimeout(function() {
						go_oval(idd, points, n, t, addX, addY);
					}, t);
				}
			}
			var points = make_points(260, 260, 1, -40, 400);
			//将圆形绘画出来。
			//$('.ladderbox').append(draw_oval( points ));
			
			var $_person = $('#person'),
				$_but = $('.but'),
				$_ladderbox = $('.ladderbox');
			$_person
				.addClass('walk')
				.animate({
				'left': '265px',
				'top': '300px'
			}, 3000, 'linear', function(){
				$_person.removeClass('walk');

				$_ladderbox.animate({
					top : '-170px',
					left : '50px'
				},2000,'linear',function(){
					$_but.show();
				});
			});
			
			$_but.click(function(){
				$_but.hide();
				$_person.addClass('around');
				go_oval('#person', points, 520, 10, -5, -5);
			});

