import * as _pi from "pareto-core/dist/interface"

import * as _p from "pareto-core/dist/expression"


export type Raw_Or_Normal_Dictionary<T> = { [id: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T> = T[] | _pi.List<T>
export type Raw_Optional<T> = null | undefined | T

export namespace optional {

    export const set = _p.optional.set
    export const not_set = _p.optional.not_set

    export const literal = <T>($: Raw_Optional<T>): _pi.Optional_Value<T> => {
        if ($ === null || $ === undefined) {
            return not_set()
        } else  {
            return set($)
        }
    }
}


export namespace dictionary {

    export const literal = <T>($: Raw_Or_Normal_Dictionary<T>): _pi.Dictionary<T> => {
        function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is _pi.Dictionary<T> {
            return $.__get_number_of_entries !== undefined && typeof $.__get_number_of_entries === "function"
        }
        if (is_normal($)) {
            return $
        } else {
            return _p.dictionary.literal($)
        }
    }

}

export namespace list {

    export const literal = <T>($: Raw_Or_Normal_List<T>): _pi.List<T> => {
        return ($ instanceof Array)
            ? _p.list.literal($)
            : $
    }

}