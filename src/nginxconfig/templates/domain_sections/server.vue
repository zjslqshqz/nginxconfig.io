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
        <div class="field-row">
            <div class="field">
                <label class="label">{{ $t('templates.domainSections.server.domain') }}</label>
                <div :class="`control${domainChanged ? ' is-changed' : ''}`">
                    <input v-model="domain" class="input" type="text" :placeholder="domainDefault" />
                </div>
            </div>

            <div class="field">
                <label class="label">{{ $t('common.path') }}</label>
                <div :class="`control${pathChanged ? ' is-changed' : ''}`">
                    <input v-model="path" class="input" type="text" :placeholder="`/var/www/${domain}`" />
                </div>
            </div>

            <div class="field">
                <label class="label">{{ $t('templates.domainSections.server.documentRoot') }}</label>
                <div :class="`control${documentRootChanged ? ' is-changed' : ''}`">
                    <input v-model="documentRoot" class="input" type="text" :placeholder="documentRootDefault" />
                </div>
            </div>
        </div>

        <div v-if="duplicateDomain" class="field">
            <div class="control">
                <label class="text message is-warning">
                    <span class="message-body">
                        {{ $t('templates.domainSections.server.oneOrMoreOtherDomainsAreAlsoNamed') }}
                        <code class="slim">{{ $props.data.domain.computed }}</code>.
                        {{ $t('templates.domainSections.server.thisWillCauseIssuesWithConfigGeneration') }}
                    </span>
                </label>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.wwwSubdomain') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${wwwSubdomainChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="wwwSubdomain" class="p-default p-curve p-fill p-icon">
                                (www.{{ $props.data.domain.computed }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="cdnSubdomainEnabled" class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.cdnSubdomain') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${cdnSubdomainChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="cdnSubdomain" class="p-default p-curve p-fill p-icon">
                                (cdn.{{ $props.data.domain.computed }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.redirectSubdomains') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${redirectSubdomainsChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="redirectSubdomains" class="p-default p-curve p-fill p-icon">
                                ({{ wwwSubdomain ? `${domain}, ` : '' }}*.{{ $props.data.domain.computed }}
                                <i class="fas fa-long-arrow-alt-right"></i>
                                {{ wwwSubdomain ? 'www.' : '' }}{{ $props.data.domain.computed }})
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ $t('templates.domainSections.server.listen') }}</label>
            </div>
            <div class="field-body">
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            IPv4
                        </a>
                    </div>
                    <div :class="`control is-expanded${listenIpv4Changed ? ' is-changed' : ''}`">
                        <input v-model="listenIpv4" class="input" type="text" :placeholder="listenIpv4Default" />
                    </div>
                </div>
                <div class="field has-addons">
                    <div class="control">
                        <a class="button is-static">
                            IPv6
                        </a>
                    </div>
                    <div :class="`control is-expanded${listenIpv6Changed ? ' is-changed' : ''}`">
                        <input v-model="listenIpv6" class="input" type="text" :placeholder="listenIpv6Default" />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">维护功能</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${maintenanceModuleChanged ? ' is-changed' : ''}`">
                        <div class="checkbox">
                            <PrettyCheck v-model="maintenanceModule" class="p-default p-curve p-fill p-icon">
                                启用
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="maintenanceModuleEnabled" class="field is-horizontal is-aligned-top">
            <div class="field-label has-margin-top">
                <label class="label">维护状态HTTP码设置</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${maintenanceHttpCodeSetChanged ? ' is-changed' : ''}`">
                        <VueSelect
                            v-model="maintenanceHttpCodeSet"
                            :options="maintenanceHttpCodeSetOptions"
                            :clearable="false"
                            :reduce="s => s.value"
                        ></VueSelect>
                    </div>

                    <div
                        v-if="maintenanceHttpCodeSetCustomEnabled"
                        :class="`control${maintenanceHttpCodeSetChanged ? ' is-changed' : ''}`"
                    >
                        <input v-model="maintenanceHttpCodeSetCustom" class="input" type="text" :placeholder="$props.data.maintenanceHttpCodeSetCustom.default" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';
    import { serverDomainDefault } from '../../util/defaults';
    import PrettyCheck from '../inputs/checkbox';
    import VueSelect from 'vue-select';
    const hiddenValues = ['', 'custom'];
    const maintenanceHttpCodeSetOptions = {
        '500': 'templates.domainSections.server.http500',
        '501': 'templates.domainSections.server.http501',
        '502': 'templates.domainSections.server.http502',
        '503': 'templates.domainSections.server.http503',
        '504': 'templates.domainSections.server.http504',
        '505': 'templates.domainSections.server.http505',
        '506': 'templates.domainSections.server.http506',
        '507': 'templates.domainSections.server.http507',
        '508': 'templates.domainSections.server.http508',
        '510': 'templates.domainSections.server.http510',
        '511': 'templates.domainSections.server.http511',
        'custom': '自定义',
    };

    const defaults = {
        domain: {
            default: serverDomainDefault,
            enabled: true,
        },
        path: {
            default: '',
            computed: `/var/www/${serverDomainDefault}`, // No default value, but a default computed
            enabled: true,
        },
        documentRoot: {
            default: '/',
            enabled: true,
        },
        wwwSubdomain: {
            default: false,
            enabled: true,
        },
        cdnSubdomain: {
            default: false,
            enabled: false,
        },
        redirectSubdomains: {
            default: true,
            enabled: true,
        },
        listenIpv4: {
            default: '*',
            enabled: true,
        },
        listenIpv6: {
            default: '::',
            enabled: true,
        },
        maintenanceModule:{
            default: true,
            enabled: true,
        },
        maintenanceHttpCodeSet:{
            default: '503',
            options: maintenanceHttpCodeSetOptions,
            enabled: true,
        },
        maintenanceHttpCodeSetCustom:{
            default: '',
            enabled: false,
        },
    };

    export default {
        name: 'DomainServer',                                   // Component name
        display: 'templates.domainSections.server.server',      // Display name for tab (i18n key)
        key: 'server',                                          // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
            PrettyCheck,
            VueSelect,
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'server'),        // Getters & setters for the delegated data
            duplicateDomain() {
                return this.$parent.$parent.$data.domains
                    .filter(d => d && d.server.domain.computed === this.$props.data.domain.computed).length > 1;
            },
            hasWarnings() {
                return this.duplicateDomain;
            },
            maintenanceHttpCodeSetOptions() {
                return Object.entries(this.$props.data.maintenanceHttpCodeSet.options)
                    .map(([key, value]) => this.formattedOption(key, value));
            },
        },
        watch: {
            '$props.data.domain': {
                handler(data) {
                    // Ignore www. if given, enable WWW subdomain
                    if (data.computed.startsWith('www.')) {
                        data.computed = data.computed.slice(4);
                        this.wwwSubdomain = true;
                    }

                    // Use default if empty
                    if (!data.computed.trim()) {
                        data.computed = data.default;
                    }

                    // Ensure there is a default path
                    if (!this.$props.data.path.value.trim()) {
                        this.$props.data.path.computed = `/var/www/${data.computed}`;
                    }
                },
                deep: true,
            },
            // Only allow CDN when WWW is enabled first
            '$props.data.wwwSubdomain': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.computed) {
                        this.$props.data.cdnSubdomain.enabled = true;
                        this.$props.data.cdnSubdomain.computed = this.$props.data.cdnSubdomain.value;
                    } else {
                        this.$props.data.cdnSubdomain.enabled = false;
                        this.$props.data.cdnSubdomain.computed = false;
                    }
                },
                deep: true,
            },
            // Ensure there is a default path
            '$props.data.path': {
                handler(data) {
                    if (!data.computed.trim()) {
                        data.computed = `/var/www/${this.$props.data.domain.computed}`;
                    }
                },
                deep: true,
            },
            '$props.data.maintenanceModule': {
                handler(data) {
                    // This might cause recursion, but seems not to
                    if (data.computed) {
                        this.$props.data.maintenanceModule.enabled = true;
                        // this.$props.data.maintenanceSet.computed = this.$props.data.maintenanceSet.value;
                    } else {
                        this.$props.data.maintenanceModule.enabled = false;
                        // this.$props.data.maintenanceSet.computed = false;
                    }
                },
                deep: true,
            },
            '$props.data.maintenanceHttpCodeSet': {
                handler(data) {
                    if (data.enabled) {
                        // This might cause recursion, but seems not to
                        if (!Object.keys(data.options).includes(data.computed))
                            data.computed = data.default;

                        // Show the custom box
                        this.$props.data.maintenanceHttpCodeSetCustom.enabled = data.computed === 'custom';
                        return;
                    }

                    // Hide custom if disabled
                    this.$props.data.maintenanceHttpCodeSetCustom.enabled = false;
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
        },
    };
</script>
