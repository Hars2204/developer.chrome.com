/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {store} from '../store';
import 'wicg-inert';

export const activateSearch = store.action(() => {
  // Scroll the window to the top of the page.
  // By default we use smooth scrolling in our CSS so we need to disable it.
  // Otherwise the window won't scroll all the way up to 0.
  const html = /** @type {HTMLElement} */ (document.querySelector('html'));
  html.style.scrollBehavior = 'auto';
  html.scrollTop = 0;

  // Mark all interactive elements as inert so the user can't tab out of the
  // search modal.
  document.querySelectorAll('[data-search-inert]').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = true;
  });

  // Prevent the user from scrolling the page underneath the search modal.
  /** @type {HTMLElement} */ (document.querySelector('body')).style.overflow =
    'hidden';

  return {isSearchActive: true};
});

export const deactivateSearch = store.action(() => {
  // Allow the page to smooth scroll again.
  /** @type {HTMLElement} */ (document.querySelector(
    'html'
  )).style.scrollBehavior = '';

  // Re-enable interactive elements now that the search modal is closed.
  document.querySelectorAll('[data-search-inert]').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = false;
  });

  // Re-enable page scrolling.
  /** @type {HTMLElement} */ (document.querySelector('body')).style.overflow =
    '';

  return {isSearchActive: false};
});
