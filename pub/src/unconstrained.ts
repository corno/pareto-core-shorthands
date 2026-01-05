import * as _pi from 'pareto-core-interface'

import * as _pinternals from 'pareto-core-internals/dist/literal'

export namespace optional {

    export const set = _pinternals.optional.set
    export const not_set = _pinternals.optional.not_set
}


// export type Raw_Or_Normal_Dictionary<T> = { [key: string]: T } | _pi.Dictionary<T>
// export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Dictionary<T> = { [key: string]: T }
export type Raw_List<T> = T[]

export type Dictionary<T_D> = _pi.Dictionary<T_D>

export type List<T_L> = _pi.List<T_L>


export const wrap_dictionary = <T>($: Raw_Dictionary<T>): Dictionary<T> => {
    return _pinternals.dictionary.literal($)
}

export const wrap_list = <T>($: T[]): List<T> => {
    return _pinternals.list.literal($)
}

export const wrap_state_group = <T>($: T) => {
    return $
}