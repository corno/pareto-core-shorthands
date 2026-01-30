import * as _pi from "pareto-core/dist/interface"
import * as _pinternals from "pareto-core/dist/__internals/sync/expression/initialize"
import { $$ as get_location_info } from "pareto-core/dist/__internals/sync/get_location_info"

//types

export type Raw_Or_Normal_Dictionary<T> = { [id: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Optional<T> = null | undefined | T



export type Reference<G_Source, T_Dictionary_Entry> = {
    readonly 'l id': string
    readonly 'l location': G_Source
}

export type Stack_Reference<G_Source, T_Dictionary_Entry> = {
    readonly 'l id': string
    readonly 'l location': G_Source
}

export type Dictionary<G_Source, T_D> = {
    readonly 'l dictionary': _pi.Dictionary<{
        readonly 'l entry': T_D
        readonly 'l location': G_Source
    }>
    readonly 'l location': G_Source
}

export type List<G_Source, T_L> = {
    readonly 'l list': _pi.List<{
        readonly 'l item': T_L
        readonly 'l location': G_Source
    }>
    readonly 'l location': G_Source
}

export type State<X> = {
    readonly 'l location': _pi.Deprecated_Source_Location
    readonly 'l state': X
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
            'l location': location,
            'l dictionary': $.__d_map(($) => ({
                'l location': location,
                'l entry': $,
            }))
        }
    } else {
        return {
            'l location': location,
            'l dictionary': _pinternals.dictionary.literal($).__d_map(($) => ({
                'l location': location,
                'l entry': $,
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
        'l location': location,
        'l list': decorated.__l_map(($) => ({
            'l location': location,
            'l item': $,
        }))
    }
}

export const wrap_state = <T extends readonly [string, any]>(
    $: T,
): State<T> => {
    return {
        'l location': get_location_info(depth + 1),
        'l state': $,
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
): Reference<_pi.Deprecated_Source_Location, T> => {
    return {
        'l location': get_location_info(depth + 1),
        'l id': $,
    }
}

export const wrap_stack_reference = <T>(
    name: string,
): Stack_Reference<_pi.Deprecated_Source_Location, T> => {
    return {
        'l location': get_location_info(depth + 1),
        'l id': name,
    }
}