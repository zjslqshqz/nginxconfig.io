export default () => {
    const config = {};

    config['# his'] = '';
    config['# s2 rewrite'] = '';
    config['rewrite'] = '^\\/S2\\/(.*)\\/(.*)\\.php$ /S2/index.php?d=$1&f=$2';
    config['# set error page'] = '';
    config['error_page'] = '500 502 503 504  /503.html';
    config['location = /503.html'] = {
        'root': '$base/Err',
    };

    // Done!
    return config;
};
