export default () => {
    const config = {};

    config['# thinkphp 6'] = '';
    config['location /'] = {
        'if (!-e $request_filename)': {
            rewrite: '^(.*)$  /index.php?s=/$1  last',
        },
    };

    // Done!
    return config;
};
