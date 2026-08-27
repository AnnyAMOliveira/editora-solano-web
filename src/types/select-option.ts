/**
 * One entry of a `SelectField`.
 *
 * Deliberately generic: the label/value pair is what any dropdown in the
 * project needs, not something specific to the genre list that is its first
 * consumer. `value` is what travels in the payload; `label` is what is read.
 */
export interface SelectOption {
  label: string;
  value: string;
}
