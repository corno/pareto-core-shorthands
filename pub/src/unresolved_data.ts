import * as _pi from "pareto-core/dist/interface"
import * as _p from "pareto-core/dist/assign"
import get_location_info from "./get_location_info"
import * as gli from "./get_location_info"

import * as astn_core_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

const get_location_info2 = (depth: number): astn_core_location.Range => {
    const loc = get_location_info(depth + 1)
    return {
        'start': {
            'absolute': -1,
            'relative': loc,
        },
        'end': {
            'absolute': -1,
            'relative': loc,
        }
    }
}

//types

export type Raw_Or_Normal_Dictionary<T> = { [id: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Optional<T> = null | undefined | T

export type Component<T> = {
    readonly 'l location': astn_core_location.Range
    readonly 'l component': T
}

export type Dictionary<G_Source, T_D> = {
    readonly 'l location': G_Source
    readonly 'l dictionary': _pi.Dictionary<{
        readonly 'l entry': T_D
        readonly 'l location': G_Source
    }>
}

export type Group<T extends { [id: string]: any }> = {
    readonly 'l location': astn_core_location.Range
    readonly 'l group': T
}

export type List<G_Source, T_L> = {
    readonly 'l list': _pi.List<{
        readonly 'l item': T_L
        readonly 'l location': G_Source
    }>
    readonly 'l location': G_Source
}

export type Nothing<G_Source> = {
    readonly 'l location': G_Source
    readonly 'l nothing': null
}

export type Number<G_Source> = {
    readonly 'l location': G_Source
    readonly 'l number': number
}

export type Reference<G_Source> = {
    readonly 'l location': G_Source
    readonly 'l reference': string
}

export type State<X> = {
    readonly 'l location': astn_core_location.Range
    readonly 'l state': X
}

export type Text<G_Source> = {
    readonly 'l location': G_Source
    readonly 'l text': string
}

//implementations

const depth = 1
export namespace optionalx {

    export const set = _p.optional.literal.set
    export const not_set = _p.optional.literal.not_set
    export const literal = <T>($: Raw_Optional<T>): _pi.Optional_Value<T> => {
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
        'l location': get_location_info2(depth),
        'l component': $,
    }
}

export const dictionary = <T>(
    $: Raw_Or_Normal_Dictionary<T>,
): Dictionary<astn_core_location.Range, T> => {
    const location = get_location_info2(depth)
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is _pi.Dictionary<T> {
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
            'l dictionary': _p.dictionary.literal($).__d_map(($) => ({
                'l location': location,
                'l entry': $,
            }))
        }
    }
}

export const list = <T>(
    $: Raw_Or_Normal_List<T>,
): List<astn_core_location.Range, T> => {
    const location = get_location_info2(depth)
    const decorated: _pi.List<T> = ($ instanceof Array)
        ? _p.list.literal($)
        : $

    return {
        'l location': location,
        'l list': decorated.__l_map(($) => ({
            'l location': location,
            'l item': $,
        }))
    }
}

export const optional = <T>(
    $: T | null | undefined,
): _pi.Optional_Value<T> => {
    if ($ === null || $ === undefined) {
        return _p.optional.literal.not_set()
    } else {
        return _p.optional.literal.set($)
    }
}

export const reference = <T>(
    $: string,
): Reference<astn_core_location.Range> => {
    return {
        'l location': get_location_info2(depth),
        'l reference': $,
    }
}

export const state = <T extends readonly [string, any]>(
    $: T,
): State<T> => {
    return {
        'l location': get_location_info2(depth),
        'l state': $,
    }
}