import * as p_di from "pareto-core/dist/data/interface"

import * as _p from "pareto-core/dist/assign"


export type Raw_Or_Normal_Dictionary<T extends p_di.Value> = { [id: string]: T } | p_di.Dictionary<T>
export type Raw_Or_Normal_List<T extends p_di.Value> = T[] | p_di.List<T>
export type Raw_Optional<T extends p_di.Value> = null | undefined | T

export namespace optional {

    export const set = _p.literal.set
    export const not_set = _p.literal.not_set

    export const null_or_value = <T extends p_di.Value>($: Raw_Optional<T>): p_di.Optional_Value<T> => {
        if ($ === null || $ === undefined) {
            return _p.literal.not_set()
        } else {
            return _p.literal.set($)
        }
    }
}


export namespace dictionary {

    export const literal = <T extends p_di.Value>($: Raw_Or_Normal_Dictionary<T>): p_di.Dictionary<T> => {
        function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is p_di.Dictionary<T> {
            return $.__get_number_of_entries !== undefined && typeof $.__get_number_of_entries === "function"
        }
        if (is_normal($)) {
            return $
        } else {
            return _p.literal.dictionary($)
        }
    }

}

export namespace list {

    export const literal = <T extends p_di.Value>($: Raw_Or_Normal_List<T>): p_di.List<T> => {
        return ($ instanceof Array)
            ? _p.literal.list($)
            : $
    }

}