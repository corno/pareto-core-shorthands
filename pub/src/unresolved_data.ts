import * as _pi from "pareto-core-internals/dist/interface"
import * as _pinternals from "pareto-core-internals/dist/__internals/sync/expression/initialize"
import { $$ as get_location_info } from "pareto-core-internals/dist/__internals/sync/get_location_info"

//types

export type Raw_Or_Normal_Dictionary<T> = { [key: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Optional<T> = null | undefined | T



export type Reference_To_Normal_Dictionary_Entry<G_Source, T_Dictionary_Entry> = {
    readonly 'key': string
    readonly 'location': G_Source
}

export type Reference_To_Stacked_Dictionary_Entry<G_Source, T_Dictionary_Entry> = {
    readonly 'key': string
    readonly 'location': G_Source
}

export type Dictionary<G_Source, T_D> = {
    readonly 'dictionary': _pi.Dictionary<{
        readonly 'entry': T_D
        readonly 'location': G_Source
    }>
    readonly 'location': G_Source
}

export type List<G_Source, T_L> = {
    readonly 'list': _pi.List<{
        readonly 'element': T_L
        readonly 'location': G_Source
    }>
    readonly 'location': G_Source
}

//implementations

const depth = 1
export namespace optional {

    export const set = _pinternals.optional.set
    export const not_set = _pinternals.optional.not_set
    export const literal = <T>($: Raw_Optional<T>): _pi.Optional_Value<T> => {
        if ($ === null || $ === undefined) {
            return not_set()
        } else {
            return set($)
        }
    }

}

export const wrap_dictionary = <T>(
    $: Raw_Or_Normal_Dictionary<T>,
): Dictionary<_pi.Deprecated_Source_Location, T> => {
    const location = get_location_info(depth + 1)
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is _pi.Dictionary<T> {
        return $.__get_number_of_entries !== undefined && typeof $.__get_number_of_entries === "function"
    }
    if (is_normal($)) {
        return {
            'location': location,
            'dictionary': $.__d_map(($) => ({
                'location': location,
                'entry': $,
            }))
        }
    } else {
        return {
            'location': location,
            'dictionary': _pinternals.dictionary.literal($).__d_map(($) => ({
                'location': location,
                'entry': $,
            }))
        }
    }
}

export const wrap_list = <T>(
    $: Raw_Or_Normal_List<T>,
): List<_pi.Deprecated_Source_Location, T> => {
    const location = get_location_info(depth + 1)
    const decorated: _pi.List<T> = $ instanceof Array
        ? _pinternals.list.literal($)
        : $

    if (!(decorated.__for_each instanceof Function)) {
        throw new Error("invalid input in 'wrap_list'")
    }
    return {
        'location': location,
        'list': decorated.__l_map(($) => ({
            'location': location,
            'element': $,
        }))
    }
}


export const wrap_state_group = <T extends readonly [string, any]>(
    $: T,
) => {
    return {
        'location': get_location_info(depth + 1),
        'state group': $,
    }
}

export const wrap_optional = <T>(
    $: T | null | undefined,
): _pi.Optional_Value<T> => {
    if ($ === null || $ === undefined) {
        return _pinternals.optional.not_set()
    } else {
        return _pinternals.optional.set($)
    }
}

export const wrap_reference = <T>(
    $: string,
): Reference_To_Normal_Dictionary_Entry<_pi.Deprecated_Source_Location, T> => {
    return {
        'location': get_location_info(depth + 1),
        'key': $,
    }
}

export const wrap_stack_reference = <T>(
    name: string,
): Reference_To_Stacked_Dictionary_Entry<_pi.Deprecated_Source_Location, T> => {
    return {
        'location': get_location_info(depth + 1),
        'key': name,
    }
}