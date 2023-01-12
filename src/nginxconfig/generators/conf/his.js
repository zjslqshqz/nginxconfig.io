export default () => {
    const config = {};

    config['# his'] = '';
    config['# s2 重定向'] = '';
    config['# 如果访问的本Web服务的URL是以 /S2/ 开头'] = '';
    config['# 中间第1个 (.*) 匹配所有字符, 然后连接一个 / , 中间第2个 (.*) 匹配所有字符, 并以 .php 结尾'] = '';
    config['# 将中间第1个 (.*) 的值提取出来,成为$1, 将中间第2个 (.*) 的值提取出来,成为$2, 并重新指向 /S2/index.php?d=$1&f=$2 文件并代入'] = '';
    config['rewrite'] = '^\\/S2\\/(.*)\\/(.*)\\.php$ /S2/index.php?d=$1&f=$2';
    config['# 错误页面路径重新'] = '';
    config['error_page'] = '500 502 503 504  /503.html';
    config['location = /503.html'] = {
        'root': '$base/Err',
    };

    // Done!
    return config;
};
