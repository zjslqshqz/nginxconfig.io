export default (ismod) => {
    const config = {};

    config['# thinkphp 6'] = '';
    if (ismod){
        config['if (!-e $request_filename)'] = {
            rewrite: '^(.*)$  /index.php?s=/$1  last',
        };
    }else {
        config['location /'] = {
            'if (!-e $request_filename)': {
                rewrite: '^(.*)$  /index.php?s=/$1  last',
            },
        };
    }

    // Done!
    return config;
};
