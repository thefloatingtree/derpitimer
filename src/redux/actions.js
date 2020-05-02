import { createAction } from '@reduxjs/toolkit'

export const setTags = createAction('start/setTags')

export const addTag = createAction('start/addTag')

export const removeTag = createAction('start/removeTag')

export const addTagGroup = createAction('start/addTagGroup')