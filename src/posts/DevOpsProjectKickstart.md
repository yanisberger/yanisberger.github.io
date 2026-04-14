---
title: "Kickstart on the Teleoperation Project"
description: "Mixed reality teleoperation system for two SO-101 robotic arms using Meta Quest 3, integrated with the LeRobot framework for imitation learning."
date: "April 2026"
readTime: "??? min read"
---

## Getting Started

On April 7th, 2026, our group started with the first hands-on task of our semester project
for the course DevOps for Cyber-Physical Systems at the University of Bern. The goal for today
was to build our two 3D-printed SO-101 robotic follower arms.

As a first step we had to remove all the support structures from the prints. This turned out
to be more work than expected as each part had a fair amount of support material wedged into
tight corners and joints, and we quickly found that a small screwdriver was the most effective
tool for getting underneath and popping it loose. With our refreshments and all the parts
sorted out in front of us, we were ready to start assembling the first arm.

![image](/DevOpsProjectPictures/disorder.jpg)

The assembly itself follows a joint-by-joint process, working up from the base. Each joint
involves securing a motor into its housing using M2 and M3 screws, attaching the motor horns,
and connecting the next arm segment. After a few minor setbacks, mostly around getting the
motor horn angles right and keeping track of which screw size goes where, we had the first
arm fully assembled by lunch.

![image](/DevOpsProjectPictures/working.jpg)

After lunch we went back to the documentation to see how to proceed. The next step was
configuring the motors, specifically, assigning each servo a unique ID so the controller
board can address them individually on the bus. Out of the box, all Feetech STS3215 motors
ship with a default ID of `1`, so you have to connect them to the board one at a time and
run the `lerobot-setup-motors` script, which walks you through each joint in sequence and
writes the correct ID and baudrate directly to the motor's non-volatile memory.

This is where we hit our first larger issue. With only one machine running Linux among us,
we couldn't work independently but instead had to do everything on one laptop. However this
was fine, since we were in no rush and the setup itself took only a couple of minutes once
everything had successfully installed.

![image](/DevOpsProjectPictures/hookedUp.jpg)

The slightly more tedious part was that we had to disconnect each motor from the arm,
plug it individually into the controller board, assign its ID, and then reconnect it,
which is noticeably fiddlier once the arm is already assembled. So we learned from our
mistake: for the second arm, we ran the motor setup before assembly. To avoid any
confusion about which servo belonged to which joint, we labeled each one accordingly
first, and only then started putting the second arm together. This made the whole
process noticeably smoother the second time around.

By the end of the session we had both arms fully assembled, all motors configured with
their correct IDs and baudrates, and the servos daisy-chained and connected back to
their respective controller boards.

![image](/DevOpsProjectPictures/TwoFinishedArms.jpg)

A solid first day. Next up is getting the LeRobot software stack running and starting
on the calibration and teleoperation setup.