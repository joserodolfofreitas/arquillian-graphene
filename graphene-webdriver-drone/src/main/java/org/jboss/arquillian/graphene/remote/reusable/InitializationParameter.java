/*
 * JBoss, Home of Professional Open Source
 * Copyright 2012, Red Hat Middleware LLC, and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.jboss.arquillian.graphene.remote.reusable;

import java.io.Serializable;
import java.net.URL;

import org.openqa.selenium.remote.DesiredCapabilities;

/**
 * @author Lukas Fryc
 */
public class InitializationParameter implements Serializable {

    private static final long serialVersionUID = -8174522811019827442L;

    private URL url;
    private DesiredCapabilities desiredCapabilities;

    public InitializationParameter(URL url, DesiredCapabilities desiredCapabilities) {
        this.url = url;
        this.desiredCapabilities = desiredCapabilities;
    }

    public URL getUrl() {
        return url;
    }

    public DesiredCapabilities getDesiredCapabilities() {
        return desiredCapabilities;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((desiredCapabilities == null) ? 0 : desiredCapabilities.hashCode());
        result = prime * result + ((url == null) ? 0 : url.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        InitializationParameter other = (InitializationParameter) obj;
        if (desiredCapabilities == null) {
            if (other.desiredCapabilities != null)
                return false;
        } else if (!desiredCapabilities.equals(other.desiredCapabilities))
            return false;
        if (url == null) {
            if (other.url != null)
                return false;
        } else if (!url.equals(other.url))
            return false;
        return true;
    }
}
