import * as _pi from 'pareto-core-interface'

import * as _pinternals from 'pareto-core-internals/dist/sync/expression/initialize'

export namespace optional {

    export const set = _pinternals.optional.set
    export const not_set = _pinternals.optional.not_set
}


export type Raw_Or_Normal_Dictionary<T> = { [key: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>


const wrap_dictionary = <T>($: Raw_Or_Normal_Dictionary<T>): _pi.Dictionary<T> => {
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is _pi.Dictionary<T> {
        return $.__get_number_of_entries !== undefined && typeof $.__get_number_of_entries === "function"
    }
    if (is_normal($)) {
        return $
    } else {
        return _pinternals.dictionary.literal($)
    }
}

const wrap_list = <T>($: Raw_Or_Normal_List<T>): _pi.List<T> => {
    if ($ instanceof Array) {
        return _pinternals.list.literal($)
    }
    if (!($.__for_each instanceof Function)) {
        throw new Error("invalid input in 'wrap_list'")
    }
    return $
}

export namespace dictionary {

    export const literal = wrap_dictionary

}

export namespace list {

    export const literal = wrap_list

}