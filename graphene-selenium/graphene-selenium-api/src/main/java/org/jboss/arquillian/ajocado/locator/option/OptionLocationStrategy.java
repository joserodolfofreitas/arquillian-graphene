/**
 * JBoss, Home of Professional Open Source
 * Copyright 2011, Red Hat, Inc. and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.jboss.arquillian.ajocado.locator.option;

import org.jboss.arquillian.ajocado.locator.AbstractLocationStrategy;

/**
 * Strategy for locating select options on the page.
 *
 * @author <a href="mailto:lfryc@redhat.com">Lukas Fryc</a>
 * @version $Revision$
 */
public class OptionLocationStrategy extends AbstractLocationStrategy {

    /**
     * Strategy for location using option id
     */
    public static final OptionLocationStrategy ID = new OptionLocationStrategy("id");

    /**
     * Strategy for location using options value
     */
    public static final OptionLocationStrategy VALUE = new OptionLocationStrategy("value");

    /**
     * Strategy for location using options label
     */
    public static final OptionLocationStrategy LABEL = new OptionLocationStrategy("label");

    /**
     * Strategy for location using option index
     */
    public static final OptionLocationStrategy INDEX = new OptionLocationStrategy("index");

    /**
     * Constructs new named options location strategy
     *
     * @param strategyName
     *            the name of strategy
     */
    public OptionLocationStrategy(String strategyName) {
        super(strategyName);
    }
}