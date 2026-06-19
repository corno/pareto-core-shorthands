import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'

export function au<RT>(
    _x: never
): RT {
    throw new Error("unreachable")
}

export type Raw_Or_Normal_Dictionary<T extends p_di.Value> = { [id: string]: T } | p_di.Dictionary<T>
export type Raw_Or_Normal_List<T extends p_di.Value> = T[] | p_di.List<T>
export type Raw_Optional<T extends p_di.Value> = null | undefined | T

export namespace optional {

    export const set = p_.literal.set
    export const not_set = p_.literal.not_set

    export const null_or_value = <T extends p_di.Value>($: Raw_Optional<T>): p_di.Optional_Value<T> => {
        if ($ === null || $ === undefined) {
            return p_.literal.not_set()
        } else {
            return p_.literal.set($)
        }
    }
}


export const dictionary = <T extends p_di.Value>($: Raw_Or_Normal_Dictionary<T>): p_di.Dictionary<T> => {
    function is_normal($: Raw_Or_Normal_Dictionary<T>): $ is p_di.Dictionary<T> {
        return $.__get_entry_deprecated !== undefined && typeof $.__get_entry_deprecated === "function"
    }
    if (is_normal($)) {
        return $
    } else {
        return p_.literal.dictionary($)
    }
}


export const list = <T extends p_di.Value>($: Raw_Or_Normal_List<T>): p_di.List<T> => {
    return ($ instanceof Array)
        ? p_.literal.list($)
        : $
}

export const nothing = (): symbol =>{
    return Symbol()
}

export const group_empty = (): symbol =>{
    return Symbol()
}