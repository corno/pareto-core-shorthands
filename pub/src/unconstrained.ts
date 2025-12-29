import * as _pint from 'pareto-core-internals'
import * as _pi from 'pareto-core-interface'

export { set, not_set } from 'pareto-core-internals'

export type Raw_Or_Normal_Dictionary<T> = { [key: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Dictionary<T> = { [key: string]: T }

export const to_raw_array = <T>($: _pi.List<T>): readonly T[] => $.__get_raw_copy()


export type Dictionary<T_D> = _pi.Dictionary<T_D>

export type List<T_L> = _pi.List<T_L>


export const wrap_dictionary = <T>($: Raw_Or_Normal_Dictionary<T>): Dictionary<T> => {
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is _pi.Dictionary<T> {
        return $.get_number_of_entries !== undefined && typeof $.get_number_of_entries === "function"
    }
    if (is_normal($)) {
        return $
    } else {
        return _pint.dictionary_literal($)
    }
}

export const wrap_list = <T>($: Raw_Or_Normal_List<T>): List<T> => {
    if ($ instanceof Array) {
        return _pint.list_literal($)
    }
    if (!($.__for_each instanceof Function)) {
        throw new Error("invalid input in 'wrap_list'")
    }
    return $
}

export const wrap_state_group = <T>($: T) => {
    return $
}