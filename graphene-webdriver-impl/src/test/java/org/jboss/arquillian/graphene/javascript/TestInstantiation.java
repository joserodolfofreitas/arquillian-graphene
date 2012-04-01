package org.jboss.arquillian.graphene.javascript;

import static org.junit.Assert.assertTrue;

import org.jboss.arquillian.graphene.javascript.JSInterfaceFactory;
import org.junit.Test;

public class TestInstantiation {

    @JavaScript
    public static interface TestingInterface {
    }

    @Test
    public void factory_should_create_valid_instance_of_given_interface() {
        JSInterfaceFactory<TestingInterface> factory = JSInterfaceFactory.create(TestingInterface.class);
        TestingInterface instance = factory.instantiate();
        assertTrue("instance should implement the provided interface", instance instanceof TestingInterface);
    }

    @JavaScript
    public static class InvalidClass {
    }

    @Test(expected = IllegalArgumentException.class)
    public void factory_should_fail_when_class_provided() {
        JSInterfaceFactory.create(InvalidClass.class);
    }
}
