import * as _pi from "pareto-core/dist/interface"

import * as _p from "pareto-core/dist/assign"


export type Raw_Or_Normal_Dictionary<T extends _pi.Value> = { [id: string]: T } | _pi.Dictionary<T>
export type Raw_Or_Normal_List<T extends _pi.Value> = T[] | _pi.List<T>
export type Raw_Optional<T extends _pi.Value> = null | undefined | T

export namespace optional {

    export namespace literal {

        export const set = _p.optional.literal.set
        export const not_set = _p.optional.literal.not_set


    }

    export const literalx = <T extends _pi.Value>($: Raw_Optional<T>): _pi.Optional_Value<T> => {
        if ($ === null || $ === undefined) {
            return _p.optional.literal.not_set()
        } else {
            return _p.optional.literal.set($)
        }
    }
}


export namespace dictionary {

    export const literal = <T extends _pi.Value>($: Raw_Or_Normal_Dictionary<T>): _pi.Dictionary<T> => {
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

    export const literal = <T extends _pi.Value>($: Raw_Or_Normal_List<T>): _pi.List<T> => {
        return ($ instanceof Array)
            ? _p.list.literal($)
            : $
    }

}