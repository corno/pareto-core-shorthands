import * as _pint from 'pareto-core-internals'
import * as _pi from 'pareto-core-interface'

export { set, not_set } from 'pareto-core-internals'

const depth = 1

export type Raw_Or_Normal_Dictionary<T> = { [key: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Dictionary<T> = { [key: string]: T }

export type Reference_To_Normal_Dictionary_Entry<G_Source, T_Dictionary_Entry> = {
    readonly 'key': string
    readonly 'location': G_Source
}

export type Reference_To_Stacked_Dictionary_Entry<G_Source, T_Dictionary_Entry> = {
    readonly 'key': string
    readonly 'location': G_Source
}

export const to_raw_array = <T>($: _pi.List<T>): readonly T[] => $.__get_raw_copy()


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


export const wrap_dictionary = <T>(
    $: Raw_Or_Normal_Dictionary<T>,
): Dictionary<_pi.Deprecated_Source_Location, T> => {
    const location = _pint.get_location_info(depth + 1)
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is _pi.Dictionary<T> {
        return $.get_number_of_entries !== undefined && typeof $.get_number_of_entries === "function"
    }
    if (is_normal($)) {
        return {
            'location': location,
            'dictionary': $.map(($) => ({
                'location': location,
                'entry': $,
            }))
        }
    } else {
        return {
            'location': location,
            'dictionary': _pint.dictionary_literal($).map(($) => ({
                'location': location,
                'entry': $,
            }))
        }
    }
}

export const wrap_list = <T>(
    $: Raw_Or_Normal_List<T>,
): List<_pi.Deprecated_Source_Location, T> => {
    const location = _pint.get_location_info(depth + 1)
    const decorated: _pi.List<T> = $ instanceof Array
        ? _pint.list_literal($)
        : $

    if (!(decorated.__for_each instanceof Function)) {
        throw new Error("invalid input in 'wrap_list'")
    }
    return {
        'location': location,
        'list': decorated.map(($) => ({
            'location': location,
            'element': $,
        }))
    }
}

export const wrap_state_group = <T>(
    $: T,
) => {
    return {
        'location': _pint.get_location_info(depth + 1),
        'state group': $,
    }
}

export const wrap_reference = <T>(
    $: string,
): Reference_To_Normal_Dictionary_Entry<_pi.Deprecated_Source_Location, T> => {
    return {
        'location': _pint.get_location_info(depth + 1),
        'key': $,
    }
}

export const wrap_stack_reference = <T>(
    name: string,
): Reference_To_Stacked_Dictionary_Entry<_pi.Deprecated_Source_Location, T> => {
    return {
        'location': _pint.get_location_info(depth + 1),
        'key': name,
    }
}