const Actions = require('./Actions');
const {sendRequest} = require('./RequestActions');

const lessonApi = require('../api/lessonApi');

export const ACTION_UPDATE_FILE = Actions.register('update-file');
export const ACTION_UPDATE_OUTPUT = Actions.register('update-output');
export const ACTION_UPDATE_OUTPUT_ERROR = Actions.register('update-output-error');
export const ACTION_FETCH_LESSON = Actions.register('fetch-lesson');
export const ACTION_UPDATE_LESSON = Actions.register('update-lesson');

export const updateFile = Actions.registerActionCreator(
  ACTION_UPDATE_FILE,
  [
    'name',
    'content',
  ]
);

export const updateOutput = Actions.registerActionCreator(
  ACTION_UPDATE_OUTPUT,
  [
    'output',
  ]
);

export const updateOutputError = Actions.registerActionCreator(
  ACTION_UPDATE_OUTPUT_ERROR,
  [
    'error',
  ]
);

export const updateLesson = Actions.registerActionCreator(
  ACTION_UPDATE_LESSON,
  [
    'lesson',
  ]
);

export const fetchLesson = Actions.registerActionCreator(
  ACTION_FETCH_LESSON,
  (id) => {
    return sendRequest({
      id: ACTION_FETCH_LESSON,
      begin() {
        return Actions.createAction(ACTION_FETCH_LESSON, {id});
      },
      makeRequest() {
        return lessonApi.get(id);
      },
      success(response) {
        return updateLesson(response);
      },
      failure(error) {
        return updateOutputError(error);
      },
    });
  }
);
