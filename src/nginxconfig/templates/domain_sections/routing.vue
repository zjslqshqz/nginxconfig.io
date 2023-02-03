<!--
Copyright 2022 DigitalOcean

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
-->

<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">root</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${rootChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="root" class="p-default p-curve p-fill p-icon">
                                {{ $t('common.enable') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="indexEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">index</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div
                        v-for="value in $props.data.index.options"
                        :class="`control${indexChanged && value === index ? ' is-changed' : ''}`"
                    >
                        <div class="radio">
                            <PrettyRadio v-model="index" :value="value" class="p-default p-round p-fill p-icon">
                                {{ value }}
                            </PrettyRadio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isFrameworkSupportEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.FrameworkSupport') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${isFrameworkSupportChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="isFrameworkSupport" class="p-default p-curve p-fill p-icon">
                                {{ $t('common.enable') }}
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="frameworkSupportEnabled">
                        <div

                            v-for="value in $props.data.frameworkSupport.options"
                            :class="`control${frameworkSupportChanged && value === frameworkSupport ? ' is-changed' : ''}`"
                        >
                            <div class="radio">
                                <PrettyRadio v-model="frameworkSupport" :value="value" class="p-default p-round p-fill p-icon">
                                    {{ value }}
                                </PrettyRadio>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="fallbackHtmlEnabled || fallbackPhpEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.fallbackRouting') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div v-if="fallbackHtmlEnabled" :class="`control${fallbackHtmlChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="fallbackHtml" class="p-default p-curve p-fill p-icon">
                                index.html
                            </PrettyCheck>
                        </div>
                    </div>
                    <div v-if="fallbackPhpEnabled" :class="`control${fallbackPhpChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="fallbackPhp" class="p-default p-curve p-fill p-icon">
                                index.php
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="fallbackPhpPathEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.fallbackRoutingPhpPath') }}</label>
            </div>
            <div class="field-body">
                <div :class="`field${fallbackPhpPathChanged ? ' is-changed' : ''}`">
                    <div class="control">
                        <input
                            v-model="fallbackPhpPath"
                            class="input"
                            type="text"
                            :placeholder="$props.data.fallbackPhpPath.default"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="legacyPhpRoutingEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.routing.legacyPhpRouting') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${legacyPhpRoutingChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="legacyPhpRouting" class="p-default p-curve p-fill p-icon">
                                {{ $t('templates.domainSections.routing.enableLegacyRouting') }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="addCustomLocationEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label has-margin-top">
                <label class="label">{{ $t('templates.domainSections.routing.addCustomLocation') }}</label>
            </div>
            <div class="field-body is-vertical">
                <div class="field"><a class="button is-tiny" @click="addLoaction">{{ $t('templates.domainSections.routing.addCustomBtn') }}</a></div>
                <div class="field is-horizontal" v-for="(_location,_loc_index) in $props.data.locationList.options">
                    <div class="field-body">
                        <div class="field is-vertical">
                            <div class="field is-horizontal">
                                <div class="field-body">
                                    <div class="field">
                                        <div>
                                            <VueSelect
                                                v-model="_location.modifier"
                                                :options="customLocationOptions"
                                                :clearable="false"
                                                :reduce="s => s.value"
                                            ></VueSelect>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <input class="input" type="text" :placeholder="$t('templates.domainSections.routing.regularAndURL')" v-model="_location.regularAndURL" />
                                    </div>
                                    <div class="field">
                                        <a class="button is-tiny" @click="addDirective(_location,'if')">{{$t('templates.domainSections.routing.addIfDirection')}}</a>
                                    </div>
                                    <div class="field">
                                        <a class="button is-tiny" @click="addDirective(_location,'custom')">{{$t('templates.domainSections.routing.addCustomDirection')}}</a>
                                    </div>
                                </div>
                            </div>
                            <!-- 指令 -->
                            <div class="field is-horizontal" v-for="(_directive,_dir_index) in _location.directive">
                                <div class="field-body" v-if="_directive.directionType === 'if'">
                                    <div class="field is-vertical">
                                        <div class="field is-horizontal">
                                            <div class="field-label">
                                                <label class="label">if</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <input class="input" type="text" v-model="_directive.condition" :placeholder="$t('templates.domainSections.routing.addIfDirectionCondition')" />
                                                </div>
                                                <div class="field">
                                                    <a class="button is-tiny" @click="addDirective(_directive,'custom')">{{$t('templates.domainSections.routing.addCustomDirection')}}</a>
                                                </div>
                                                <div class="field">
                                                    <a class="button is-tiny is-danger" @click="delDirective(_location.directive,_dir_index)">{{$t('templates.domainSections.routing.delDirection')}}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field is-horizontal" v-for="(_dir,_dir_i) in _directive.directive">
                                            <div class="field-label"></div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <input class="input" type="text" v-model="_dir.directive" :placeholder="$t('templates.domainSections.routing.customDirectionDirective')" />
                                                </div>
                                                <div class="field">
                                                    <input class="input" type="text" v-model="_dir.parameters" :placeholder="$t('templates.domainSections.routing.customDirectionParameters')" />
                                                </div>
                                                <div class="field">
                                                    <a class="button is-tiny is-danger" @click="delDirective(_directive.directive,_dir_i)">{{$t('templates.domainSections.routing.delDirection')}}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field-body" v-if="_directive.directionType === 'custom'">
                                    <div class="field">
                                        <input class="input" type="text" v-model="_directive.directive" :placeholder="$t('templates.domainSections.routing.customDirectionDirective')" />
                                    </div>
                                    <div class="field">
                                        <input class="input" type="text" v-model="_directive.parameters" :placeholder="$t('templates.domainSections.routing.customDirectionParameters')" />
                                    </div>
                                    <div class="field">
                                        <a class="button is-tiny is-danger" @click="delDirective(_location.directive,_dir_index)">{{$t('templates.domainSections.routing.delDirection')}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field"><a class="button is-tiny is-danger" @click="delDirective($props.data.locationList.options,_loc_index)">{{$t('templates.domainSections.routing.delDirection')}}</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';
    import PrettyCheck from '../inputs/checkbox';
    import PrettyRadio from '../inputs/radio';
    import VueSelect from 'vue-select';
    const hiddenValues = [''];
    const customLocationOptions = {
        '': 'templates.domainSections.routing.customLocationOptionsNone',
        '=': 'templates.domainSections.routing.customLocationOptionsAccurateSearch',
        '~': 'templates.domainSections.routing.customLocationOptionsCaseSensitiveMatch',
        '~*': 'templates.domainSections.routing.customLocationOptionsNoCaseSensitiveMatch',
        '^~': 'templates.domainSections.routing.customLocationOptionsPrefixMatch',
    };
    const defaults = {
        root: {
            default: true,
            enabled: true,
        },
        index: {
            default: 'all',
            options: ['index.html', 'index.php', 'all'],
            enabled: true,
        },
        fallbackHtml: {
            default: false,
            enabled: true,
        },
        fallbackPhp: {
            default: true,
            enabled: true,
        },
        fallbackPhpPath: {
            default: '/api/',
            enabled: false,
        },
        legacyPhpRouting: {
            default: false,
            enabled: true,
        },
        isFrameworkSupport: {
            default: true,
            enabled: true,
        },
        frameworkSupport: {
            default: 'HIS',
            options: ['ThinkPHP 6', 'HIS'],
            enabled: true,
        },
        addCustomLocation: {
            default: true,
            enabled: true,
        },
        customLocation:{
            default: '',
            options: customLocationOptions,
            enabled: true,
        },
        locationList:{
            default: [],
            enabled: true,
            options: [],
        },
    };

    export default {
        name: 'DomainRouting',                                  // Component name
        display: 'templates.domainSections.routing.routing',    // Display name for tab (i18n key)
        key: 'routing',                                         // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            VueSelect,
            PrettyCheck,
            PrettyRadio,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'routing'),
            customLocationOptions() {
                return Object.entries(this.$props.data.customLocation.options)
                    .map(([key, value]) => this.formattedOption(key, value));
            },
        },    // Getters & setters for the delegated data
        watch: {
            // Disable all options (expect legacy php) if root is disabled
            '$props.data.root': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.index.enabled = true;
                        this.$props.data.index.computed = this.$props.data.index.value;
                        this.$props.data.fallbackHtml.enabled = true;
                        this.$props.data.fallbackHtml.computed = this.$props.data.fallbackHtml.value;
                        this.$props.data.fallbackPhp.enabled = true;
                        this.$props.data.fallbackPhp.computed = this.$props.data.fallbackPhp.value;
                        this.$props.data.isFrameworkSupport.enabled = true;
                        this.$props.data.isFrameworkSupport.computed = this.$props.data.isFrameworkSupport.value;
                        this.$props.data.frameworkSupport.enabled = true;
                        this.$props.data.frameworkSupport.computed = this.$props.data.frameworkSupport.value;
                    } else {
                        this.$props.data.index.enabled = false;
                        this.$props.data.index.computed = '';
                        this.$props.data.fallbackHtml.enabled = false;
                        this.$props.data.fallbackHtml.computed = false;
                        this.$props.data.fallbackPhp.enabled = false;
                        this.$props.data.fallbackPhp.computed = false;
                        this.$props.data.isFrameworkSupport.enabled = false;
                        this.$props.data.isFrameworkSupport.computed = false;
                        this.$props.data.frameworkSupport.enabled = false;
                        this.$props.data.frameworkSupport.computed = false;
                    }
                },
                deep: true,
            },
            // Only enable PHP path if both fallback routing options enabled
            '$props.data': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.fallbackHtml.computed && data.fallbackPhp.computed) {
                        this.$props.data.fallbackPhpPath.enabled = true;
                        this.$props.data.fallbackPhpPath.computed = this.$props.data.fallbackPhpPath.value;
                    } else {
                        this.$props.data.fallbackPhpPath.enabled = false;
                        this.$props.data.fallbackPhpPath.computed = '';
                    }
                },
                deep: true,
            },
            // framework support
            '$props.data.isFrameworkSupport': {
                handler(data) {
                    if (data.computed) {
                        this.$props.data.frameworkSupport.enabled = true;
                        this.$props.data.frameworkSupport.computed = this.$props.data.frameworkSupport.value;
                    } else {
                        this.$props.data.frameworkSupport.enabled = false;
                        this.$props.data.frameworkSupport.computed = false;
                    }
                },
                deep: true,
            },
            '$props.data.locationList.options':{
                handler(data) {
                    this.$props.data.locationList.computed = [...data];
                },
                deep: true,
            },
        },
        methods: {
            formattedOption(key, value) {
                return {
                    label: `${this.$t(value)}${hiddenValues.includes(key) ? '' : `: ${key}`}`,
                    value: key,
                };
            },
            addLoaction(){
                // 添加 location 指令
                if (!this.$props.data.locationList.options.some(d=> d.regularAndURL == '')){
                    this.$props.data.locationList.options.push({
                        directionType:'location',
                        modifier:'',
                        regularAndURL:'',
                        directive:[],
                    });
                }
            },
            addDirective(goal,directionType){
                // 其他指令
                let o = {
                    directionType:directionType,
                };
                // if 指令
                if (directionType == 'if'){
                    if (goal.directive.filter(d=>d.directionType == directionType).some(d=>d.condition == '')){
                        return;
                    }
                    o.condition = '';
                    o.directive = [];
                }
                // 自定义指令
                if (directionType == 'custom'){
                    if (goal.directive.filter(d=>d.directionType == directionType).some(d=>d.directive == '' || d.parameters == '')){
                        return;
                    }
                    o.directive = '';
                    o.parameters = '';
                }
                goal.directive.push(o);
            },
            delDirective(obj,index){
                // 删除指令
                obj.splice(index,1);
            },
        },
    };
</script>
