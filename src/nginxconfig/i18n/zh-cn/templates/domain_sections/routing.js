/*
Copyright 2020 DigitalOcean

This code is licensed under the MIT License.
You may obtain a copy of the License at
https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE or https://mit-license.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import common from '../../common';

export default {
    fallbackRouting: '后备路由',
    fallbackRoutingPhpPath: `后备路由${common.php}路径`,
    legacyPhpRouting: `传统${common.php}路由`,
    enableLegacyRouting: `${common.enable}传统路由`,
    routing: '路由设置',
    FrameworkSupport: '框架兼容',
    addCustomLocation: '自定义 location 规则',
    addCustomBtn: '添加规则',
    regularAndURL: '正则与URL地址',
    addIfDirection: '添加 if 指令',
    addCustomDirection: '添加自定义指令',
    addIfDirectionCondition: 'if 指令条件',
    delDirection: '删除',
    customDirectionDirective: '自定义指令',
    customDirectionParameters: '自定义指令参数',
    customLocationOptionsNone: '无修饰符',
    customLocationOptionsAccurateSearch: '精确查找',
    customLocationOptionsCaseSensitiveMatch: '区分大小写匹配',
    customLocationOptionsNoCaseSensitiveMatch: '不区分大小写匹配',
    customLocationOptionsPrefixMatch: '前缀匹配',
};
