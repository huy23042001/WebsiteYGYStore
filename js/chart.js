var ctx = document.getElementById('myChart')
ctx.height = 500
ctx.width = 500
var data = {
	labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'THáng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
	datasets: [{
		fill: false,
		label: 'Hoàn thành',
		borderColor: successColor,
		data: [120, 115, 130, 100, 123, 88, 99, 80, 120, 110, 94, 101],
		borderWidth: 2,
		lineTension: 0,
	}, {
		fill: false,
		label: 'Bị Hủy',
		borderColor: dangerColor,
		data: [12, 17, 9, 12, 20, 12, 7, 11, 4, 15, 8, 10],
		borderWidth: 2,
		lineTension: 0,
	}]
}

var lineChart = new Chart(ctx, {
	type: 'line',
	data: data,
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
	}
})