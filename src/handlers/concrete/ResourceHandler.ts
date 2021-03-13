/*
 * MIT License
 *
 * Copyright (c) 2019-2021 Drash Land
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { HttpMethod } from "../../domain/types/HttpMethod.ts";
import { Request } from "../../http/Request.ts";
import { IResource } from "../../resources/IResource.ts";
import { Handler } from "../Handler.ts";

/**
 * The ResourceHandler class that handles resources logic
 *
 * @class
 * @since 2.0.0
 */
export class ResourceHandler extends Handler {
  private resources: Map<string, IResource>;

  public constructor(resources: Map<string, IResource>) {
    super();
    this.resources = resources;
  }

  public handle(request: Request) {
    const resource = this.resources.get(request["url"]);
    if (!resource) {
      return super.handle(request);
    }

    const methodToExecute = <HttpMethod>request["method"].toUpperCase();
    return resource[methodToExecute](request);
  }
}
