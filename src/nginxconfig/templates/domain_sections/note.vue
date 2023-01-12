<template>
    <div>
        <div class="field is-horizontal is-aligned-top">
            <div class="field-label has-margin-top">
                <label class="label">{{ $t('templates.domainSections.note.noteTitle') }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div :class="`control${noteExplainChanged ? ' is-changed' : ''}`">
                        <input v-model="noteExplain" class="input" type="text" :placeholder="$t('templates.domainSections.note.notePlaceholder')" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import delegatedFromDefaults from '../../util/delegated_from_defaults';
    import computedFromDefaults from '../../util/computed_from_defaults';

    const defaults = {
        noteExplain: {
            default: '',
            enabled: true,
        },
    };

    export default {
        name: 'Note',
        display: 'templates.domainSections.note.note',        // Display name for tab (i18n key)
        key: 'note',                                           // Key for data in parent
        delegated: delegatedFromDefaults(defaults),             // Data the parent will present here
        components: {
        
        },
        props: {
            data: Object,                                       // Data delegated back to us from parent
        },
        computed: {
            ...computedFromDefaults(defaults, 'note'),         // Getters & setters for the delegated data
        },
    };
</script>
