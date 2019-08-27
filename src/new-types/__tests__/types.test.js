// @flow
/* eslint-disable no-unused-vars */
import * as React from 'react'
import {
  step,
  createStore,
  createNode,
  createEvent,
  createEffect,
  createApi,
  createStoreObject,
  createDomain,
  clearNode,
  restoreEffect,
  combine,
  sample,
  Effect,
  Store,
  Event,
  //ComputedStore,
  //ComputedEvent,
  /*::type*/ kind,
  /*::type*/ CompositeName,
  forward,
  launch,
  split,
} from 'effector'
import {createComponent, createGate, useGate} from 'effector-react'
import {createFormApi} from '@effector/forms'
import setupLocation from '../setupLocation'
const typecheck = '{global}'

describe('Unit', () => {
  describe('split', () => {
    describe('split infer result', () => {
      describe('split result no false-negative', () => {
        it('works with user-defined event', () => {
          const source: Event<string[]> = createEvent()
          const {emptyList, oneElement, __: commonList} = split(source, {
            emptyList: list => list.length === 0,
            oneElement: list => list.length === 1,
          })
          const split_result__nofneg__user_defined: Event<string[]> = emptyList
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            no errors

            --flow--
            no errors
            "
          `)
        })
        it('works with default event', () => {
          const source: Event<string[]> = createEvent()
          const {emptyList, oneElement, __} = split(source, {
            emptyList: list => list.length === 0,
            oneElement: list => list.length === 1,
          })
          const split_result__nofneg__defaults: Event<string[]> = __
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            no errors

            --flow--
            no errors
            "
          `)
        })
      })
      describe('split result no false-positive', () => {
        test('split result no false-positive user-defined', () => {
          const source: Event<string[]> = createEvent()
          const {emptyList, oneElement} = split(source, {
            emptyList: list => list.length === 0,
            oneElement: list => list.length === 1,
          })
          const split_result__nofpos__user_defined_1: Event<number> = emptyList
          const split_result__nofpos__user_defined_2: null = oneElement
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            Type 'Event<string[]>' is not assignable to type 'Event<number>'.
              Types of property 'watch' are incompatible.
                Type '(watcher: (payload: string[]) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
                  Types of parameters 'watcher' and 'watcher' are incompatible.
                    Types of parameters 'payload' and 'payload' are incompatible.
                      Type 'string[]' is not assignable to type 'number'.
            Type 'Event<string[]>' is not assignable to type 'null'.

            --flow--
            Cannot assign 'emptyList' to 'split_result__nofpos__user_defined_1'
              const split_result__nofpos__user_defined_1: Event<number> = emptyList
                                                                          ^^^^^^^^^
              array type [1] is incompatible with number [2] in type argument 'Payload' [3]
                  const source: Event<string[]> = createEvent()
                                  [1] ^^^^^^^^
                  const split_result__nofpos__user_defined_1: Event<number> = emptyList
                                                                [2] ^^^^^^
                  declare export class Event<Payload> implements Unit<Payload> {
                                         [3] ^^^^^^^
            Cannot assign 'oneElement' to 'split_result__nofpos__user_defined_2'
              const split_result__nofpos__user_defined_2: null = oneElement
                                                                 ^^^^^^^^^^
              'Event' [1] is incompatible with null [2]
                  (h: (payload: S) => boolean) => Event<S>,
                                              [1] ^^^^^^^^
                  const split_result__nofpos__user_defined_2: null = oneElement
                                                          [2] ^^^^
            "
          `)
        })
        test('split result no false-positive defaults 1', () => {
          const source: Event<string[]> = createEvent()
          const {__} = split(source, {
            emptyList: list => list.length === 0,
            oneElement: list => list.length === 1,
          })
          const split_result__nofpos__defaults_1: Event<number> = __
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            Type 'Event<string[]>' is not assignable to type 'Event<number>'.

            --flow--
            Cannot assign '__' to 'split_result__nofpos__defaults_1'
              const split_result__nofpos__defaults_1: Event<number> = __
                                                                      ^^
              array type [1] is incompatible with number [2] in type argument 'Payload' [3]
                  const source: Event<string[]> = createEvent()
                                  [1] ^^^^^^^^
                  const split_result__nofpos__defaults_1: Event<number> = __
                                                            [2] ^^^^^^
                  declare export class Event<Payload> implements Unit<Payload> {
                                         [3] ^^^^^^^
            "
          `)
        })
        test('split result no false-positive defaults 2', () => {
          const source: Event<string[]> = createEvent()
          const {__} = split(source, {
            emptyList: list => list.length === 0,
            oneElement: list => list.length === 1,
          })
          const split_result__nofpos__defaults_2: null = __
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            Type 'Event<string[]>' is not assignable to type 'null'.

            --flow--
            Cannot assign '__' to 'split_result__nofpos__defaults_2'
              const split_result__nofpos__defaults_2: null = __
                                                             ^^
              'Event' [1] is incompatible with null [2]
                  (h: (payload: S) => boolean) => Event<S>,
                                              [1] ^^^^^^^^
                  const split_result__nofpos__defaults_2: null = __
                                                      [2] ^^^^
            "
          `)
        })
      })
    })

    test('split arguments no false-positive', () => {
      const source: Event<string[]> = createEvent()
      split(source, {
        wrongResult: list => null,
        wrongArg_1: (list: null) => true,
        wrongArg_2: (list: number[]) => true,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'null' is not assignable to type 'boolean'.
        Type '(list: null) => true' is not assignable to type '(payload: string[]) => boolean'.
          Types of parameters 'list' and 'payload' are incompatible.
            Type 'string[]' is not assignable to type 'null'.
        Type '(list: number[]) => true' is not assignable to type '(payload: string[]) => boolean'.
          Types of parameters 'list' and 'payload' are incompatible.
            Type 'string[]' is not assignable to type 'number[]'.
              Type 'string' is not assignable to type 'number'.

        --flow--
        Cannot call 'split'
          split(source, {
          ^^^^^
          null [1] is incompatible with array type [2] in property 'wrongArg_1'
              wrongArg_1: (list: null) => true,
                             [1] ^^^^
              const source: Event<string[]> = createEvent()
                              [2] ^^^^^^^^
        Cannot call 'split' with object literal bound to 'cases'
          wrongResult: list => null,
                               ^^^^
          null [1] is incompatible with boolean [2] in the return value of property 'wrongResult'
              wrongResult: list => null,
                               [1] ^^^^
              +[name: string]: (payload: S) => boolean,
                                           [2] ^^^^^^^
        Cannot call 'split' with object literal bound to 'cases'
          wrongArg_1: (list: null) => true,
                             ^^^^
          null [1] is incompatible with array type [2] in the first argument of property 'wrongArg_1'
              wrongArg_1: (list: null) => true,
                             [1] ^^^^
              const source: Event<string[]> = createEvent()
                              [2] ^^^^^^^^
        Cannot call 'split' with object literal bound to 'cases'
          wrongArg_2: (list: number[]) => true,
                             ^^^^^^
          number [1] is incompatible with string [2] in array element of the first argument of property 'wrongArg_2'
              wrongArg_2: (list: number[]) => true,
                             [1] ^^^^^^
              const source: Event<string[]> = createEvent()
                              [2] ^^^^^^
        "
      `)
    })
  })
  describe('sample', () => {
    test('event by event', () => {
      const a = createEvent<number>()
      const b = createEvent<boolean>()
      const c = sample(a, b)

      const sample_ee_check1: Event<number> = c
      const sample_ee_check2: Event<string> = c
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<number>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: number) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'number' is not assignable to type 'string'.

        --flow--
        Cannot assign 'c' to 'sample_ee_check2'
          const sample_ee_check2: Event<string> = c
                                                  ^
          number [1] is incompatible with string [2] in type argument 'Payload' [3]
              const a = createEvent<number>()
                                [1] ^^^^^^
              const sample_ee_check2: Event<string> = c
                                        [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })
    test('event by event with handler', () => {
      const a = createEvent<string>()
      const b = createEvent<boolean>()
      const c = sample(a, b, (a, b) => ({a, b}))

      const sample_eeh_check1: Event<{a: string, b: boolean}> = c
      const sample_eeh_check2: Event<string> = c
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<{ a: string; b: boolean; }>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: { a: string; b: boolean; }) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type '{ a: string; b: boolean; }' is not assignable to type 'string'.

        --flow--
        Cannot assign 'c' to 'sample_eeh_check2'
          const sample_eeh_check2: Event<string> = c
                                                   ^
          object type [1] is incompatible with string [2] in type argument 'Payload' [3]
              const sample_eeh_check1: Event<{a: string, b: boolean}> = c
                                         [1] ^^^^^^^^^^^^^^^^^^^^^^^
              const sample_eeh_check2: Event<string> = c
                                         [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })

    test('store by event', () => {
      const d = createStore(0)
      const b = createEvent<boolean>()
      const e = sample(d, b)

      const sample_se_check1: Event<number> = e
      const sample_se_check2: Event<string> = e
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<number>' is not assignable to type 'Event<string>'.

        --flow--
        Cannot assign 'e' to 'sample_se_check2'
          const sample_se_check2: Event<string> = e
                                                  ^
          number [1] is incompatible with string [2] in type argument 'Payload' [3]
              const sample_se_check1: Event<number> = e
                                        [1] ^^^^^^
              const sample_se_check2: Event<string> = e
                                        [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })
    test('store by event with handler', () => {
      const d = createStore('')
      const b = createEvent<boolean>()
      const e = sample(d, b, (a, b) => ({a, b}))

      const sample_seh_check1: Event<{a: string, b: boolean}> = e
      const sample_seh_check2: Event<string> = e
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<{ a: string; b: boolean; }>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: { a: string; b: boolean; }) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type '{ a: string; b: boolean; }' is not assignable to type 'string'.

        --flow--
        Cannot assign 'e' to 'sample_seh_check2'
          const sample_seh_check2: Event<string> = e
                                                   ^
          object type [1] is incompatible with string [2] in type argument 'Payload' [3]
              const sample_seh_check1: Event<{a: string, b: boolean}> = e
                                         [1] ^^^^^^^^^^^^^^^^^^^^^^^
              const sample_seh_check2: Event<string> = e
                                         [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })

    test('effect by event', () => {
      const f = createEffect<string, any, any>()
      const b = createEvent<boolean>()
      const g = sample(f, b)

      const sample_efe_check1: Event<string> = g
      const sample_efe_check2: Event<number> = g
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<string>' is not assignable to type 'Event<number>'.

        --flow--
        Cannot assign 'g' to 'sample_efe_check2'
          const sample_efe_check2: Event<number> = g
                                                   ^
          string [1] is incompatible with number [2] in type argument 'Payload' [3]
              const f = createEffect<string, any, any>()
                                 [1] ^^^^^^
              const sample_efe_check2: Event<number> = g
                                         [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })
    test('effect by event with handler', () => {
      const f = createEffect<string, any, any>()
      const b = createEvent<boolean>()
      const g = sample(f, b, (a, b) => ({a, b}))

      const sample_efeh_check1: Event<{a: string, b: boolean}> = g
      const sample_efeh_check2: Event<number> = g
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<{ a: string; b: boolean; }>' is not assignable to type 'Event<number>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: { a: string; b: boolean; }) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type '{ a: string; b: boolean; }' is not assignable to type 'number'.

        --flow--
        Cannot assign 'g' to 'sample_efeh_check2'
          const sample_efeh_check2: Event<number> = g
                                                    ^
          object type [1] is incompatible with number [2] in type argument 'Payload' [3]
              const sample_efeh_check1: Event<{a: string, b: boolean}> = g
                                          [1] ^^^^^^^^^^^^^^^^^^^^^^^
              const sample_efeh_check2: Event<number> = g
                                          [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })

    test('store by store', () => {
      const a = createStore(false)
      const b = createStore(0)
      const c = sample(a, b)

      const sample_ss_check1: Store<boolean> = c
      const sample_ss_check2: Store<string> = c
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Store<boolean>' is not assignable to type 'Store<string>'.
          Types of property 'getState' are incompatible.
            Type '() => boolean' is not assignable to type '() => string'.
              Type 'boolean' is not assignable to type 'string'.

        --flow--
        Cannot assign 'c' to 'sample_ss_check2'
          const sample_ss_check2: Store<string> = c
                                                  ^
          boolean [1] is incompatible with string [2] in type argument 'State' [3]
              const sample_ss_check1: Store<boolean> = c
                                        [1] ^^^^^^^
              const sample_ss_check2: Store<string> = c
                                        [2] ^^^^^^
              declare export class Store<State> implements Unit<State> {
                                     [3] ^^^^^
        "
      `)
    })
    test('store by store with handler', () => {
      const a = createStore('')
      const b = createStore(true)
      const c = sample(a, b, (a, b) => ({a, b}))

      const sample_ssh_check1: Store<{a: string, b: boolean}> = c
      const sample_ssh_check2: Store<string> = c
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Store<{ a: string; b: boolean; }>' is not assignable to type 'Store<string>'.
          Types of property 'getState' are incompatible.
            Type '() => { a: string; b: boolean; }' is not assignable to type '() => string'.
              Type '{ a: string; b: boolean; }' is not assignable to type 'string'.

        --flow--
        Cannot assign 'c' to 'sample_ssh_check2'
          const sample_ssh_check2: Store<string> = c
                                                   ^
          object type [1] is incompatible with string [2] in type argument 'State' [3]
              const sample_ssh_check1: Store<{a: string, b: boolean}> = c
                                         [1] ^^^^^^^^^^^^^^^^^^^^^^^
              const sample_ssh_check2: Store<string> = c
                                         [2] ^^^^^^
              declare export class Store<State> implements Unit<State> {
                                     [3] ^^^^^
        "
      `)
    })
    describe('sample(Store<T>):Store<T>', () => {
      test('correct case', () => {
        const a = createStore('')
        const sample_s_correct: Store<string> = sample(a)
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
        `)
      })
      test('incorrect case', () => {
        const a = createStore('')
        const sample_s_incorrect: Store<number> = sample(a)
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Store<string>' is not assignable to type 'Store<number>'.

          --flow--
          Cannot assign 'sample(...)' to 'sample_s_incorrect'
            const sample_s_incorrect: Store<number> = sample(a)
                                                      ^^^^^^^^^
            string [1] is incompatible with number [2] in type argument 'State' [3]
                const a = createStore('')
                                  [1] ^^
                const sample_s_incorrect: Store<number> = sample(a)
                                            [2] ^^^^^^
                declare export class Store<State> implements Unit<State> {
                                       [3] ^^^^^
          "
        `)
      })
      describe('edge case', () => {
        test('correct case', () => {
          const a = createStore('')
          const clock = createEvent()
          const sample_s_edge_correct: Event<string> = sample(a, clock)
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            no errors

            --flow--
            no errors
            "
          `)
        })
        test('incorrect case', () => {
          const a = createStore('')
          const clock = createEvent()
          const sample_s_edge_incorrect: Event<number> = sample(a, clock)
          expect(typecheck).toMatchInlineSnapshot(`
            "
            --typescript--
            Type 'Event<string>' is not assignable to type 'Event<number>'.

            --flow--
            Cannot assign 'sample(...)' to 'sample_s_edge_incorrect'
              const sample_s_edge_incorrect: Event<number> = sample(a, clock)
                                                             ^^^^^^^^^^^^^^^^
              string [1] is incompatible with number [2] in type argument 'Payload' [3]
                  const a = createStore('')
                                    [1] ^^
                  const sample_s_edge_incorrect: Event<number> = sample(a, clock)
                                                   [2] ^^^^^^
                  declare export class Event<Payload> implements Unit<Payload> {
                                         [3] ^^^^^^^
            "
          `)
        })
      })
    })
  })
})

describe('Event', () => {
  test('createEvent', () => {
    const createEvent_event1: Event<number> = createEvent()
    const createEvent_event2: Event<number> = createEvent('event name [1]')
    const createEvent_event3: Event<number> = createEvent({
      name: 'event name [2]',
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('#(properties)', () => {
    const event = createEvent()
    const kind: kind = event.kind
    const shortName: string = event.shortName
    const domainName: CompositeName | typeof undefined = event.domainName
    const compositeName: CompositeName = event.compositeName

    const computed = event.map(() => 'hello')
    const kind1: kind = computed.kind
    const shortName1: string = computed.shortName
    const domainName1: CompositeName | typeof undefined = computed.domainName
    const compositeName1: CompositeName = computed.compositeName
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('#map', () => {
    const event: Event<number> = createEvent()
    const computed = event.map(() => 'foo')

    //const check1: Event<string> = computed
    const event_map_check2: Event<number> = computed
    event(2)
    computed('')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<string>' is not assignable to type 'Event<number>'.
        Types of property 'watch' are incompatible.
          Type '(watcher: (payload: string) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
            Types of parameters 'watcher' and 'watcher' are incompatible.
              Types of parameters 'payload' and 'payload' are incompatible.
                Type 'string' is not assignable to type 'number'.

      --flow--
      Cannot assign 'computed' to 'event_map_check2'
        const event_map_check2: Event<number> = computed
                                                ^^^^^^^^
        string [1] is incompatible with number [2] in type argument 'Payload' [3]
            const computed = event.map(() => 'foo')
                                         [1] ^^^^^
            const event_map_check2: Event<number> = computed
                                      [2] ^^^^^^
            declare export class Event<Payload> implements Unit<Payload> {
                                   [3] ^^^^^^^
      Cannot assign 'computed' to 'event_map_check2'
        const event_map_check2: Event<number> = computed
                                                ^^^^^^^^
        string [1] is incompatible with number [2] in type argument 'Payload' [3]
            computed('')
                 [1] ^^
            const event_map_check2: Event<number> = computed
                                      [2] ^^^^^^
            declare export class Event<Payload> implements Unit<Payload> {
                                   [3] ^^^^^^^
      "
    `)
  })
  test('#watch', () => {
    const event: Event<number> = createEvent()
    event.watch(state => {
      const check1: number = state
      return state
    })
    event.watch(state => 'foo')
    event.watch(state => {
      return
    })
    event.watch(state => {})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  describe('#filter', () => {
    test('#filter ok', () => {
      const event: Event<number> = createEvent()
      const filteredEvent_ok: Event<string> = event.filter(n => {
        if (n % 2) return n.toString()
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    test('#filter incorrect', () => {
      const event: Event<number> = createEvent()
      const filteredEvent_error: Event<number> = event.filter(n => {
        if (n % 2) return n.toString()
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<string>' is not assignable to type 'Event<number>'.

        --flow--
        Cannot assign 'event.filter(...)' to 'filteredEvent_error'
          if (n % 2) return n.toString()
                            ^^^^^^^^^^^^
          string [1] is incompatible with number [2] in type argument 'Payload' [3]
          <BUILTINS>/core.js
              toString(radix?: number): string;
                                    [1] ^^^^^^
              const filteredEvent_error: Event<number> = event.filter(n => {
                                           [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })
  })
})

describe('Effect', () => {
  test('createEffect', () => {
    const createEffect_effect1: Effect<number, string> = createEffect()
    const createEffect_effect2 = createEffect('', {
      handler: createEffect_effect1,
    })

    const createEffect_effect3 = createEffect('', {
      handler() {
        return 'foo'
      },
    })
    const createEffect_effect4: Effect<number, string> = createEffect('fx 4')
    const createEffect_effect5: Effect<number, string> = createEffect({
      name: 'fx 5',
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#(properties)', () => {
    const effect = createEffect()
    const kind: kind = effect.kind
    const shortName: string = effect.shortName
    const domainName: CompositeName | typeof undefined = effect.domainName
    const compositeName: CompositeName = effect.compositeName

    const computed = effect.map(() => 'hello')
    const kind1: kind = computed.kind
    const shortName1: string = computed.shortName
    const domainName1: CompositeName | typeof undefined = computed.domainName
    const compositeName1: CompositeName = computed.compositeName
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#use', () => {
    const effect1 = createEffect()
    const foo = createEffect<number, string, any>()

    effect1.use(params => Promise.resolve('foo'))
    effect1.use(foo)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Effect<number, string, any>' is not assignable to parameter of type '(params: unknown) => unknown'.
        Types of parameters 'payload' and 'params' are incompatible.
          Type 'unknown' is not assignable to type 'number'.

      --flow--
      no errors
      "
    `)
  })

  describe('void params', () => {
    test('with handler', () => {
      const handler = () => {}
      const effect = createEffect('', {handler})
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Expected 1 arguments, but got 0.

        --flow--
        no errors
        "
      `)
    })
    test('with use', () => {
      const handler = () => {}
      const effect = createEffect('').use(handler)
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Expected 1 arguments, but got 0.

        --flow--
        no errors
        "
      `)
    })
  })
  describe('nested effects', () => {
    describe('with handler', () => {
      test('no false-positive (should be type error)', () => {
        const nestedEffect: Effect<string, string> = createEffect()
        const parentEffect: Effect<number, number> = createEffect(
          'should not throw',
          {
            handler: nestedEffect,
          },
        )
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Effect<string, string, Error>' is not assignable to type 'Effect<number, number, Error>'.
            Types of property 'done' are incompatible.
              Type 'Event<{ params: string; result: string; }>' is not assignable to type 'Event<{ params: number; result: number; }>'.
                Types of property 'watch' are incompatible.
                  Type '(watcher: (payload: { params: string; result: string; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { params: number; result: number; }) => any) => Subscription'.
                    Types of parameters 'watcher' and 'watcher' are incompatible.
                      Types of parameters 'payload' and 'payload' are incompatible.
                        Type '{ params: string; result: string; }' is not assignable to type '{ params: number; result: number; }'.

          --flow--
          Cannot assign 'createEffect(...)' to 'parentEffect'
            const parentEffect: Effect<number, number> = createEffect(
                                                         ^^^^^^^^^^^^^...
            number [1] is incompatible with string [2] in type argument 'Params' [3]
                const parentEffect: Effect<number, number> = createEffect(
                                       [1] ^^^^^^
                const nestedEffect: Effect<string, string> = createEffect()
                                       [2] ^^^^^^
                declare export class Effect<Params, Done, Fail = Error>
                                        [3] ^^^^^^
          Cannot assign 'createEffect(...)' to 'parentEffect'
            const parentEffect: Effect<number, number> = createEffect(
                                                         ^^^^^^^^^^^^^...
            string [1] is incompatible with number [2] in type argument 'Done' [3]
                const nestedEffect: Effect<string, string> = createEffect()
                                               [1] ^^^^^^
                const parentEffect: Effect<number, number> = createEffect(
                                               [2] ^^^^^^
                declare export class Effect<Params, Done, Fail = Error>
                                                [3] ^^^^
          "
        `)
      })
    })
    test('with use', () => {})
  })
})

describe('Store', () => {
  test('createStore', () => {
    const createStore_store1: Store<number> = createStore(0)
    const createStore_store2: Store<string> = createStore(0)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<number>' is not assignable to type 'Store<string>'.
        Types of property 'getState' are incompatible.
          Type '() => number' is not assignable to type '() => string'.
            Type 'number' is not assignable to type 'string'.

      --flow--
      Cannot assign 'createStore(...)' to 'createStore_store2'
        const createStore_store2: Store<string> = createStore(0)
                                                              ^
        number [1] is incompatible with string [2] in type argument 'State' [3]
            const createStore_store2: Store<string> = createStore(0)
                                                              [1] ^
            const createStore_store2: Store<string> = createStore(0)
                                        [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test('createStoreObject', () => {
    const ev = createEvent()
    const a = createStore('')
    const b = createStore(0)
    const c = createStoreObject({a, b})
    c.on(ev, (state, payload) => state)
    c.reset(ev)
    c.off(ev)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  describe('createApi', () => {
    const store: Store<number> = createStore(0)
    test('check1', () => {
      const {event} = createApi(store, {
        event: (n, x: number) => x,
      })
      const createApi_check1: Event<number> = event
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    test('check2', () => {
      const {event} = createApi(store, {
        event: (n, x: number) => x,
      })
      const createApi_check2: Event<string> = event
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<number>' is not assignable to type 'Event<string>'.

        --flow--
        Cannot assign 'event' to 'createApi_check2'
          const createApi_check2: Event<string> = event
                                                  ^^^^^
          string [1] is incompatible with number [2] in type argument 'Payload' [3]
              const createApi_check2: Event<string> = event
                                        [1] ^^^^^^
              event: (n, x: number) => x,
                        [2] ^^^^^^
              declare export class Event<Payload> implements Unit<Payload> {
                                     [3] ^^^^^^^
        "
      `)
    })
    test('check3', () => {
      const {event} = createApi(store, {
        event: (n, x) => x,
      })
      const createApi_check3: Event<string> = event
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Event<void>' is not assignable to type 'Event<string>'.
          Types of property 'watch' are incompatible.
            Type '(watcher: (payload: void) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type 'void' is not assignable to type 'string'.

        --flow--
        Cannot call 'createApi' with object literal bound to 'api'
          event: (n, x) => x,
                           ^
          string [1] is incompatible with number [2] in the return value of property 'event'
              const createApi_check3: Event<string> = event
                                        [1] ^^^^^^
              const store: Store<number> = createStore(0)
                             [2] ^^^^^^
        "
      `)
    })
  })
  test('createApi voids', () => {
    const store = createStore(0)
    const api = createApi(store, {
      increment: count => count + 1,
      decrement: count => count - 1,
      double: count => count * 2,
      multiply: (count, mp = 2) => count * mp,
    })

    api.double() // Expected 1 arguments, but got 0.
    api.multiply() // Expected 1 arguments, but got 0.
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('setStoreName', () => {})
  test('combine', () => {
    const ev = createEvent()
    const a = createStore('')
    const b = createStore(0)
    const c = combine(a, b, (a, b) => a + b)
    c.on(ev, (state, payload) => state)
    c.reset(ev)
    c.off(ev)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('restore', () => {
    const eff = createEffect<{foo: number}, {bar: string}, any>()
    const foo = restoreEffect(eff, {bar: ''})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#(properties)', () => {
    const store = createStore(0)
    const kind: kind = store.kind
    const shortName: string = store.shortName
    const domainName: CompositeName | typeof undefined = store.domainName
    const compositeName: CompositeName = store.compositeName
    const defaultState: number = store.defaultState

    const computed = store.map(() => 'hello')
    const kind1: kind = computed.kind
    const shortName1: string = computed.shortName
    const domainName1: CompositeName | typeof undefined = computed.domainName
    const compositeName1: CompositeName = computed.compositeName
    const defaultState1: string = computed.defaultState
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#getState', () => {
    const store = createStore(0)
    const state: number = store.getState()

    const computed = store.map(() => 'hello')
    const state1: string = computed.getState()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#map', () => {
    const store = createStore(0)
    const computed = store.map(() => 'hello')

    const map_check1: Store<string> = computed

    const map_check2: Store<number> = computed
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.
        Types of property 'getState' are incompatible.
          Type '() => string' is not assignable to type '() => number'.
            Type 'string' is not assignable to type 'number'.

      --flow--
      Cannot assign 'computed' to 'map_check2'
        const map_check2: Store<number> = computed
                                          ^^^^^^^^
        string [1] is incompatible with number [2] in type argument 'State' [3]
            const map_check1: Store<string> = computed
                                [1] ^^^^^^
            const map_check2: Store<number> = computed
                                [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })

  test('#reset', () => {
    const event = createEvent()
    const store = createStore(0)
    store.reset(event)
    const computed = store.map(() => 'hello')

    computed.reset(event)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#on', () => {
    const event = createEvent()
    const store = createStore(0)
    store.on(event, (state, payload) => state)
    const computed = store.map(() => 'hello')

    computed.on(event, (state, payload) => state)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#off', () => {
    const event = createEvent()
    const store = createStore(0)
    store.off(event)
    const computed = store.map(() => 'hello')

    computed.off(event)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#subscribe', () => {
    const event = createEvent()
    const store = createStore(0)
    // @ts-ignore I don't know type
    store.subscribe(() => {})
    const computed = store.map(() => 'hello')
    // @ts-ignore I don't know type
    computed.subscribe(() => {})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#watch', () => {
    const event: Event<number> = createEvent()
    const store = createStore(0)
    store.watch((state, payload) => {
      const store_watch_check1: number = state
      const store_watch_check2: typeof undefined = payload
    })
    store.watch(event, (state, payload) => {
      const store_watchBy_check1: number = state
      const store_watchBy_check2: number = payload
    })
    const computed = store.map(() => 'hello')
    computed.watch((state, payload) => {
      const store_watchComputed_check1: string = state
      const store_watchComputed_check2: typeof undefined = payload
    })
    computed.watch(event, (state, payload) => {
      const store_watchByComputed_check1: string = state
      const store_watchByComputed_check2: number = payload
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#thru', () => {
    const event = createEvent()
    const store = createStore(0)
    const result = store.thru(store => {
      const thru_check1: Store<number> = store
      return thru_check1
    })

    const computed = store.map(() => 'hello')
    const result1 = computed.thru(store => {
      const thru_computed_check1: Store<string> = store
      return thru_computed_check1
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})

describe('Domain', () => {
  test('createDomain', () => {
    const domain = createDomain()
    const domain2 = createDomain('hello')
    const domain3 = createDomain(234)
    const domain4 = createDomain({foo: true})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '234' is not assignable to parameter of type 'string | undefined'.
      Argument of type '{ foo: boolean; }' is not assignable to parameter of type 'string'.

      --flow--
      Cannot call 'createDomain' with '234' bound to 'domainName'
        const domain3 = createDomain(234)
                                     ^^^
        number [1] is incompatible with string [2]
            const domain3 = createDomain(234)
                                     [1] ^^^
            declare export function createDomain(domainName?: string): Domain
                                                          [2] ^^^^^^
      Cannot call 'createDomain' with object literal bound to 'domainName'
        const domain4 = createDomain({foo: true})
                                     ^^^^^^^^^^^
        object literal [1] is incompatible with string [2]
            const domain4 = createDomain({foo: true})
                                     [1] ^^^^^^^^^^^
            declare export function createDomain(domainName?: string): Domain
                                                          [2] ^^^^^^
      "
    `)
  })

  test('#event', () => {
    const domain = createDomain()
    const event = domain.event<string>()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('#effect', () => {
    const domain = createDomain()
    const effect1: Effect<string, number, Error> = domain.effect()
    const effect2 = domain.effect('', {
      handler(params: string) {
        return 256
      },
    })
    effect2(20)
    const effect3 = domain.effect('', {
      handler: effect1,
    })
    effect3(20)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '20' is not assignable to parameter of type 'string'.
      Argument of type '20' is not assignable to parameter of type 'string'.

      --flow--
      Cannot call 'effect2' with '20' bound to 'payload'
        effect2(20)
                ^^
        number [1] is incompatible with string [2]
            effect2(20)
                [1] ^^
            handler(params: string) {
                        [2] ^^^^^^
      Cannot call 'effect3' with '20' bound to 'payload'
        effect3(20)
                ^^
        number [1] is incompatible with string [2]
            effect3(20)
                [1] ^^
            const effect1: Effect<string, number, Error> = domain.effect()
                              [2] ^^^^^^
      "
    `)
  })

  test('#onCreateStore', () => {
    const root = createDomain('root')
    root.onCreateStore(store => {
      const snapshot = localStorage.getItem(store.shortName)
      if (typeof snapshot === 'string') store.setState(JSON.parse(snapshot))

      let isFirstSkiped = false
      store.watch(newState => {
        if (isFirstSkiped) {
          localStorage.setItem(store.shortName, JSON.stringify(newState))
        }
        isFirstSkiped = true
      })
      return store
    })

    root.onCreateStore(foo => {
      const object = createStoreObject({foo})
      object.watch(data => {
        data.foo
      })

      clearNode(foo)
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})

describe('Graph', () => {
  describe('forward', () => {
    test('forward between events', () => {
      const forward_event1 = createEvent<number>()
      const forward_event2 = createEvent<number>()
      forward({
        from: forward_event1,
        to: forward_event2,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    describe('forward between effects', () => {
      test('start in parallel with the same payload', () => {
        const forward_effect_par1 = createEffect<number, string, string>()
        const forward_effect_par2 = createEffect<number, string, string>()
        forward({
          from: forward_effect_par1,
          to: forward_effect_par2,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
        `)
      })
      test('start sequentially', () => {
        const forward_effect_seq1 = createEffect<number, string, string>()
        const forward_effect_seq2 = createEffect<string, boolean, boolean>()
        forward({
          from: forward_effect_seq1.done.map(({result}) => result),
          to: forward_effect_seq2,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
        `)
      })
    })

    test('forward between stores', () => {
      const e = createStore(0)
      const f = createStore(0)
      forward({from: e, to: f})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    describe('forward with subtyping', () => {
      const str: Event<string> = createEvent()
      const strOrNum: Event<string | number> = createEvent()
      const num: Event<number> = createEvent()
      it('incompatible (should fail)', () => {
        forward({from: str, to: num})
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Event<string>' is not assignable to type 'Unit<number>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'number'.

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            forward({from: str, to: num})
                    ^^^^^^^^^^^^^^^^^^^^
            number [1] is incompatible with string [2] in type argument 'T' [3] of property 'to'
                const num: Event<number> = createEvent()
                             [1] ^^^^^^
                const str: Event<string> = createEvent()
                             [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
      it('same types (should be ok)', () => {
        forward({from: str, to: str})
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
        `)
      })
      it('more strict -> less strict type (should be ok)', () => {
        forward({from: str, to: strOrNum})
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
        `)
      })
      it('less strict -> more strict type (should fail)', () => {
        forward({from: strOrNum, to: str})
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            forward({from: strOrNum, to: str})
                    ^^^^^^^^^^^^^^^^^^^^^^^^^
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'to'
                const str: Event<string> = createEvent()
                             [1] ^^^^^^
                const strOrNum: Event<string | number> = createEvent()
                                           [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
      it('generic from (?)', () => {
        forward<string | number>({from: strOrNum, to: str})
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            forward<string | number>({from: strOrNum, to: str})
                                     ^^^^^^^^^^^^^^^^^^^^^^^^^
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'to'
                const str: Event<string> = createEvent()
                             [1] ^^^^^^
                forward<string | number>({from: strOrNum, to: str})
                             [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
      it('generic to (should fail)', () => {
        forward<string>({from: strOrNum, to: str})
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Event<string | number>' is not assignable to type 'Unit<string>'.
            Types of property '__' are incompatible.
              Type 'string | number' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            forward<string>({from: strOrNum, to: str})
                            ^^^^^^^^^^^^^^^^^^^^^^^^^
            number [1] is incompatible with string [2] in type argument 'T' [3] of property 'from'
                const strOrNum: Event<string | number> = createEvent()
                                           [1] ^^^^^^
                forward<string>({from: strOrNum, to: str})
                    [2] ^^^^^^
                interface CovariantUnit<+T> {
                                     [3] ^
          "
        `)
      })
    })
  })

  test('launch', () => {
    const foo = createEvent<number>()
    const customNode = createNode({
      scope: {max: 100, lastValue: -1, add: 10},
      child: [foo],
      node: [
        step.compute({
          fn: (arg, {add}) => arg + add,
        }),
        step.filter({
          fn: (arg, {max, lastValue}) => arg < max && arg !== lastValue,
        }),
        step.compute({
          fn(arg, scope) {
            scope.lastValue = arg
            return arg
          },
        }),
      ],
    })
    launch(foo, '')
    launch(foo, 0)
    launch(customNode, 100)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '\\"\\"' is not assignable to parameter of type 'number'.

      --flow--
      Cannot call 'launch' with empty string bound to 'payload'
        launch(foo, '')
                    ^^
        string [1] is incompatible with number [2]
            launch(foo, '')
                    [1] ^^
            const foo = createEvent<number>()
                                [2] ^^^^^^
      "
    `)
  })
})

describe('effector-react', () => {
  test('createComponent', () => {
    const ImplicitObject = createComponent(
      {
        a: createStore<number>(0),
        b: createStore<number>(1),
      },
      (props, state) => {
        const createComponent_implicitObject_check1: number = state.a
        const createComponent_implicitObject_check2: number = state.b
        return null
      },
    )
    const Store = createComponent(createStore(0), (props, state) => {
      const createComponent_createStore_check1: number = state
      return null
    })

    const list = createStore<{
      [key: number]: {
        text: string,
      },
    }>({})
    const InitialProps = createComponent(
      (initialProps: {id: number}) => {
        const createComponent_initialProps_check1: number = initialProps.id
        const createComponent_initialProps_check2: string = initialProps.id
        const createComponent_initialProps_check3: string =
          initialProps.unknownProp
        return list.map(list => list[initialProps.id] || {text: 'Loading...'})
      },
      (_, state) => {
        const createComponent_initialProps_check4: string = state.text
        const createComponent_initialProps_check5: number = state.text
        return null
      },
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'number' is not assignable to type 'string'.
      Property 'unknownProp' does not exist on type '{ id: number; }'.
      Type 'string' is not assignable to type 'number'.

      --flow--
      Cannot assign 'initialProps.id' to 'createComponent_initialProps_check2'
        const createComponent_initialProps_check2: string = initialProps.id
                                                            ^^^^^^^^^^^^^^^
        number [1] is incompatible with string [2]
            (initialProps: {id: number}) => {
                            [1] ^^^^^^
            const createComponent_initialProps_check2: string = initialProps.id
                                                   [2] ^^^^^^
      Cannot get 'initialProps.unknownProp'
        initialProps.unknownProp
                     ^^^^^^^^^^^
        property 'unknownProp' is missing in object type [1]
            (initialProps: {id: number}) => {
                       [1] ^^^^^^^^^^^^
      Cannot assign 'state.text' to 'createComponent_initialProps_check5'
        const createComponent_initialProps_check5: number = state.text
                                                            ^^^^^^^^^^
        string [1] is incompatible with number [2]
            text: string,
              [1] ^^^^^^
            const createComponent_initialProps_check5: number = state.text
                                                   [2] ^^^^^^
      "
    `)
  })

  test('createGate', () => {
    const Foo = createGate<number>('foo')
    const Bar = createGate<{a: number}>('bar')
    const Baz = createGate<number | null>('baz', null)

    const Component = () => {
      useGate(Foo, 1)
      useGate(Bar, 1)
      useGate(Bar, {a: 1})
      useGate(Bar, {})

      useGate(Baz, null)
      useGate(Baz, 1)
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'number' does not satisfy the constraint 'object'.
      Argument of type '1' is not assignable to parameter of type '{ a: number; } | undefined'.
      Argument of type '{}' is not assignable to parameter of type '{ a: number; }'.
        Property 'a' is missing in type '{}' but required in type '{ a: number; }'.


      --flow--
      Cannot call 'createGate'
        const Foo = createGate<number>('foo')
                               ^^^^^^
        number [1] is incompatible with object type [2] in type argument 'Props'
            const Foo = createGate<number>('foo')
                               [1] ^^^^^^
            declare export function createGate<Props: {...}>(name?: string): Gate<Props>
                                                  [2] ^^^^^
      Cannot call 'useGate' with '1' bound to 'props'
        useGate(Bar, 1)
                     ^
        number [1] is incompatible with object type [2]
            useGate(Bar, 1)
                     [1] ^
            const Bar = createGate<{a: number}>('bar')
                               [2] ^^^^^^^^^^^
      "
    `)
  })
})

describe('effector-vue', () => {})

describe('@effector/forms', () => {
  describe('createFormApi', () => {
    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
    })
  })
})
