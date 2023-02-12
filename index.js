const height = 600;
const width = 600;
const margin = 30;

usdData = [{
            date: new Date(2015, 02, 19),
            rate: 61.34
        },
        {
            date: new Date(2015, 02, 24),
            rate: 59.44
        },
        {
            date: new Date(2015, 02, 28),
            rate: 57.72
        },
        {
            date: new Date(2015, 03, 3),
            rate: 56.99
        },
        {
            date: new Date(2015, 03, 8),
            rate: 55.33
        },
        {
            date: new Date(2015, 03, 11),
            rate: 51.06
        },
    ],
    eurData = [{
            date: new Date(2015, 02, 19),
            rate: 65.01
        },
        {
            date: new Date(2015, 02, 24),
            rate: 64.15
        },
        {
            date: new Date(2015, 02, 28),
            rate: 62.56
        },
        {
            date: new Date(2015, 03, 3),
            rate: 61.69
        },
        {
            date: new Date(2015, 03, 8),
            rate: 60.41
        },
        {
            date: new Date(2015, 03, 11),
            rate: 54.27
        },
    ];


var svg = d3.select("body").append("svg")
    .attr("class", "axis")
    .attr("width", width)
    .attr("height", height);

// длина оси X= ширина контейнера svg - отступ слева и справа
var xAxisLength = width - 2 * margin;

// длина оси Y = высота контейнера svg - отступ сверху и снизу
var yAxisLength = height - 2 * margin;
// находим максимальное значение для оси Y
var maxValue = d3.max([d3.max(eurData, function (d) {
        return d.rate;
    }),
    d3.max(usdData, function (d) {
        return d.rate;
    })
]);
// находим минимальное значение для оси Y
var minValue = d3.min([d3.min(eurData, function (d) {
        return d.rate;
    }),
    d3.min(usdData, function (d) {
        return d.rate;
    })
]);

// функция интерполяции значений на ось Х  
var scaleX = d3.scaleTime()
    .domain([d3.min(usdData, function (d) {
            return d.date;
        }),
        d3.max(usdData, function (d) {
            return d.date;
        })
    ])
    .range([0, xAxisLength]);

// функция интерполяции значений на ось Y
var scaleY = d3.scaleLinear()
    .domain([maxValue, minValue])
    .range([0, yAxisLength]);
// создаем ось X   
var xAxis = d3.axisBottom(scaleX)

// создаем ось Y             
var yAxis = d3.axisLeft(scaleY)


// отрисовка оси Х             
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", // сдвиг оси вниз и вправо
        "translate(" + margin + "," + (height - margin) + ")")
    .call(xAxis);

// отрисовка оси Y 
svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", // сдвиг оси вниз и вправо на margin
        "translate(" + margin + "," + margin + ")")
    .call(yAxis);

// создаем набор вертикальных линий для сетки   
d3.selectAll("g.x-axis g.tick")
    .append("line") // добавляем линию
    .classed("grid-line", true) // добавляем класс
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -(height - 2 * margin));

// рисуем горизонтальные линии 
d3.selectAll("g.y-axis g.tick")
    .append("line")
    .classed("grid-line", true)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", xAxisLength)
    .attr("y2", 0);
createChart(usdData, "steelblue", "usd");
createChart(eurData, "#FF7F0E", "euro");

// обща функция для создания графиков
function createChart(data, colorStroke, label) {

    // функция, создающая по массиву точек линии
    var line = d3.line()
        .x(function (d) {
            return scaleX(d.date) + margin;
        })
        .y(function (d) {
            return scaleY(d.rate) + margin;
        });

    var g = svg.append("g");
    g.append("path")
        .attr("d", line(data))
        .style("stroke", colorStroke)
        .style("stroke-width", 2);

    // добавляем отметки к точкам
    svg.selectAll(".dot " + label)
        .data(data)
        .enter().append("circle")
        .style("stroke", colorStroke)
        .style("fill", "white")
        .attr("class", "dot " + label)
        .attr("r", 3.5)
        .attr("cx", function (d) {
            return scaleX(d.date) + margin;
        })
        .attr("cy", function (d) {
            return scaleY(d.rate) + margin;
        });
};




/*document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getMessage').onclick = function () {
        const req = new XMLHttpRequest();
        req.open("GET", '/json/cats.json', true);
        req.send();
        req.onload = function () {
            const json = JSON.parse(req.responseText);
            let html = "";
            json = json.filter(function (val) {
                return (val.id !== 1);
            });
            json.forEach(function (val) {
                html += "<div class = 'cat'>";

                html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>";


                html += "</div><br>";
            });
            document.getElementsByClassName('message')[0].innerHTML = html;
        };
    };
});*/

// get geolocation Data to find a User's GPS Coordinates
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        document.getElementById('data').innerHTML = "latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
    });
}

//get Data with js XMLHttpRequest method


/*document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('sendMessage').onclick = function () {

        const userName = document.getElementById('name').value;
        const url = 'https://jsonplaceholder.typicode.com/posts';
        // Додайте свій код під цим рядком
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                const serverResponse = JSON.parse(xhr.response);
                document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
            }
        };
        const body = JSON.stringify({
            userName: userName,
            suffix: ' loves cats!'
        });
        xhr.send(body);

        // Додайте свій код над цим рядком
    };
});*/