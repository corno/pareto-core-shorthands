import * as p_di from "pareto-core/dist/data/interface"
import * as p_a from "pareto-core/dist/assign"
import get_location_info from "./get_location_info"

import * as liana_core_location from "liana-core/dist/interface/to_be_generated/document_and_location"

const get_location_info_3_deep = (): liana_core_location.Range => {
    const loc = get_location_info(3) //3 because we want the caller of the caller (in the shorthands file) of the caller (in this file) of this function, which is the one that is creating the data structure
    return ['in subdocument', {
        'context': {
            'subdocument resource identifier': loc["document resource identifier"],
            'range of include in main document': {
                'start': {
                    'absolute': -1,
                    'relative': loc,
                },
                'end': {
                    'absolute': -1,
                    'relative': loc,
                }
            }
        },
        'range': {

            'start': {
                'absolute': -1,
                'relative': loc,
            },
            'end': {
                'absolute': -1,
                'relative': loc,
            }
        }
    }]
}

//types

export type Raw_Or_Normal_Dictionary<T extends p_di.Value> = { [id: string]: T } | p_di.Dictionary<T>
export type Raw_Or_Normal_List<T extends p_di.Value> = T[] | p_di.List<T>
export type Raw_Optional<T extends p_di.Value> = null | undefined | T

export type Component<T> = {
    readonly 'l location': liana_core_location.Range
    readonly 'l component': T
}

export type Dictionary<G_Source extends p_di.Value, T_D extends p_di.Value> = {
    readonly 'l location': G_Source
    readonly 'l dictionary': p_di.Dictionary<{
        readonly 'l entry': T_D
        readonly 'l location': G_Source
    }>
}

export type Group<T extends { [id: string]: p_di.Value }> = {
    readonly 'l location': liana_core_location.Range
    readonly 'l group': T
}

export type List<G_Source extends p_di.Value, T_L extends p_di.Value> = {
    readonly 'l list': p_di.List<{
        readonly 'l item': T_L
        readonly 'l location': G_Source
    }>
    readonly 'l location': G_Source
}

export type Nothing<G_Source extends p_di.Value> = {
    readonly 'l location': G_Source
    readonly 'l nothing': null
}

export type Number<G_Source extends p_di.Value> = {
    readonly 'l location': G_Source
    readonly 'l number': number
}

export type Reference<G_Source extends p_di.Value> = {
    readonly 'l location': G_Source
    readonly 'l reference': string
}

export type State<X> = {
    readonly 'l location': liana_core_location.Range
    readonly 'l state': X
}

export type Text<G_Source extends p_di.Value> = {
    readonly 'l location': G_Source
    readonly 'l text': string
}

//implementations
export namespace optional {

    export const set = p_a.literal.set
    export const not_set = p_a.literal.not_set
    export const null_or_value = <T extends p_di.Value>($: Raw_Optional<T>): p_di.Optional_Value<T> => {
        if ($ === null || $ === undefined) {
            return not_set()
        } else {
            return set($)
        }
    }

}

export const constrained_component = <T>(
    $: T,
): Component<T> => {
    return {
        'l location': get_location_info_3_deep(),
        'l component': $,
    }
}

export const dictionary = <T extends p_di.Value>(
    $: Raw_Or_Normal_Dictionary<T>,
): Dictionary<liana_core_location.Range, T> => {
    const location = get_location_info_3_deep()
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is p_di.Dictionary<T> {
        return $.__get_number_of_entries !== undefined && typeof $.__get_number_of_entries === "function"
    }
    if (is_normal($)) {
        return {
            'l location': location,
            'l dictionary': $.__d_map(($) => ({
                'l location': location,
                'l entry': $,
            }))
        }
    } else {
        return {
            'l location': location,
            'l dictionary': p_a.literal.dictionary($).__d_map(($) => ({
                'l location': location,
                'l entry': $,
            }))
        }
    }
}

export const list = <T extends p_di.Value>(
    $: Raw_Or_Normal_List<T>,
): List<liana_core_location.Range, T> => {
    const location = get_location_info_3_deep()
    const decorated: p_di.List<T> = ($ instanceof Array)
        ? p_a.literal.list($)
        : $

    return {
        'l location': location,
        'l list': decorated.__l_map(($) => ({
            'l location': location,
            'l item': $,
        }))
    }
}

export const reference = <T extends p_di.Value>(
    $: string,
): Reference<liana_core_location.Range> => {
    return {
        'l location': get_location_info_3_deep(),
        'l reference': $,
    }
}

export const state = <T extends p_di.State>(
    $: T,
): State<T> => {
    return {
        'l location': get_location_info_3_deep(),
        'l state': $,
    }
}