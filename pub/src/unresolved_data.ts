import * as _pi from 'pareto-core-interface'
import * as _pinternals from 'pareto-core-internals/dist/literal'
import { $$ as get_location_info } from 'pareto-core-internals/dist/misc/get_location_info'

//types

// export type Raw_Or_Normal_Dictionary<T> = { [key: string]: T } | _pi.Dictionary<T>
// export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Dictionary<T> = { [key: string]: T }
export type Raw_List<T> = T[]


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
}

export const wrap_dictionary = <T>(
    $: Raw_Dictionary<T>,
): Dictionary<_pi.Deprecated_Source_Location, T> => {
    const location = get_location_info(depth + 1)
    return {
        'location': location,
        'dictionary': _pinternals.dictionary.literal($).map(($) => ({
            'location': location,
            'entry': $,
        }))
    }
}

export const wrap_list = <T>(
    $: Raw_List<T>,
): List<_pi.Deprecated_Source_Location, T> => {
    const location = get_location_info(depth + 1)
    return {
        'location': location,
        'list': _pinternals.list.literal($).map(($) => ({
            'location': location,
            'element': $,
        }))
    }
}

export const wrap_state_group = <T>(
    $: T,
) => {
    return {
        'location': get_location_info(depth + 1),
        'state group': $,
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