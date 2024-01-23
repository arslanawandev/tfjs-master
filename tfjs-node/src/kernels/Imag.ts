/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {Imag, ImagInputs, KernelConfig} from '@tensorflow/tfjs';

import {NodeJSKernelBackend} from '../nodejs_kernel_backend';

export const imagConfig: KernelConfig = {
  kernelName: Imag,
  backendName: 'tensorflow',
  kernelFunc: (args) => {
    const {input} = args.inputs as ImagInputs;
    const backend = args.backend as NodeJSKernelBackend;

    const opAttrs = [
      {
        name: 'T',
        type: backend.binding.TF_ATTR_TYPE,
        value: backend.binding.TF_COMPLEX64
      },
      {
        name: 'Tout',
        type: backend.binding.TF_ATTR_TYPE,
        value: backend.binding.TF_FLOAT
      }
    ];
    const inputs = [input];
    return backend.executeSingleOutput(Imag, opAttrs, inputs);
  }
};
