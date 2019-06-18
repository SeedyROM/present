/*

ReactJS based declarative animation library, written in typescript. It should utilize the new Context and Hook APIs from react to make this functional and also well hidden.

Initial idea is to use hooks to alter the state of the Animation component, this will then inject the key frames and elements into it's scope.
Hopefully if I'm in not a fucking idiot, this idea work, but we won't know til the beer wares off.
~( O v O)~

///////////////////////
=======================

Initial Goals:
  Create a single element transition that

Component Ideas:
  Animation:
    - Is the root component for composing a complex and time based animation
  Keyframes:
    - Contain the list of each element / change for the animation
    - Contains a set of animation primitives that are defined as components
      - Each primitive:
        - Has options for sync (default), async or queue based order of execution
        - Can set own priority in the render cycle
        - Contains the ability to specify easing

=======================
///////////////////////

*/

const initialExampleConcept = (
  <Animate>
    <KeyFrames>
      <Tween
        component="component"
        ease="linear"
        priority={1}
        duration={300}
        to={{
          opacity: 1,
        }}
      />
    </KeyFrames>
    <Elements>
      <Component name="component" />
    </Elements>
  </Animate>
);

/* 

Crap Shoots:
 - withPresence(animation)(component)? Possibly allow components to use this API with a HOC? I have no idea!?!

*/
