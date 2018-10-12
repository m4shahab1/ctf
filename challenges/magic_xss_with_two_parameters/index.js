const http = require('http');
const url = require('url');
const queryString = require('querystring');

http.createServer((request, response) => {
    var query = queryString.parse(url.parse(request.url).query);
    var escaped_query = {}
    for (var name in query) {
        escaped_query[name] = query[name].replace('\'', '');
    }
    response.end(`\   
<html>
	<body>
		<script>
			if ('${escaped_query.key}' != '') {
				if (window.location.indexOf('exmaple.com') != -1) {
					document.cookie = '${escaped_query.key}' + "=" + '${escaped_query.value}' + ";domain=example.com";
				} else {
					document.cookie = '${escaped_query.key}' + "=" + '${escaped_query.value}';
				}
			}
		</script>
	</body>
</html> 
    `);
}).listen(8080);