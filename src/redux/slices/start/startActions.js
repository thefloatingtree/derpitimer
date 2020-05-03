import { createAction } from '@reduxjs/toolkit'

export const setTags = createAction('start/setTags')
export const addTag = createAction('start/addTag')
export const removeTag = createAction('start/removeTag')
export const setTagGroups = createAction('start/setTagGroups')
export const addTagGroup = createAction('start/addTagGroup')
export const removeTagGroup = createAction('start/removeTagGroup')