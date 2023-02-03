export default () => {
    const config = {};

    config['# his'] = '';

    config['# maintenanceModule control'] = '';
    config['if ($maintenance = on)'] = {
        'rewrite': '^/ /503.html break',
    };

    config['# s2 rewrite'] = '';
    config['rewrite'] = '^\\/S2\\/(.*)\\/(.*)\\.php$ /S2/index.php?d=$1&f=$2';

    config['# set error page'] = '';
    config['error_page'] = '500 502 503 504  /503.html';
    config['location = /503.html'] = {
        'root': '$base/VC/Err',
    };
    
    config['# get request ping mod'] = '';
    config['location ~* ^/0.'] = {
        'return': '205',
    };

    // Done!
    return config;
};
