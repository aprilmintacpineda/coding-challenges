I don't know what this coding challenge is called, if you do know, please open an issue and maybe we can discuss it there?

---

# Robot on a table

#### Running

- Install the latest version of [NodeJs](https://nodejs.org/en/).
- Verify your installation by running `npm -v` and `node -v`.
- Clone the repository `https://github.com/aprilmintacpineda/coding-challenges.git`.
- Go to the project directory; `cd coding-challenges`.
- `npm i` to install dependencies.
- Go to the `RobotOnTable` folder; `cd RobotOnTable`
- then run; `node index.js`

#### Description

The application is a simulation of a robot moving on a square table top, of dimensions 5 units x 5 units. There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

Create a console application that can read in commands of the following form:

```
PLACE X,Y,F
 MOVE
 LEFT
 RIGHT
 REPORT
```

- `PLACE` will put the robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
- The origin (0,0) can be considered to be the SOUTH WEST most corner. It is required that the first command to the robot is a `PLACE` command, after that, any sequence of commands may be issued, in any order, including another `PLACE` command.
- The application should discard all commands in the sequence until a valid `PLACE` command has been executed.
- `MOVE` will move the robot one unit forward in the direction it is currently facing.
- `LEFT` and `RIGHT` will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
- `REPORT` will announce the `X`,`Y` and `F` of the robot. This can be in any form, but standard output is sufficient. A robot that is not on the table can choose to ignore the `MOVE`, `LEFT`, `RIGHT` and `REPORT` commands.


#### Constraints

The robot must not fall off the table during movement. This also includes the initial placement of the robot. Any move that would cause the robot to fall must be ignored.

#### Example Input and Output

Input:

```
 PLACE 0,0,NORTH
 MOVE
 REPORT  
```

Output: `0,1,NORTH`

Input: 

```
PLACE 0,0,NORTH
LEFT
 REPORT 
```

 Output: `0 ,0,WEST`

 Input:

```
 PLACE 1,2,EAST
MOVE
 MOVE
 LEFT
 MOVE
 REPORT
```

 Output: `3 ,3,NORTH`
