# Network-UI

An Interactive Floating Network Animation

## Overview

This project implements an interactive floating network animation using HTML5 Canvas, JavaScript, and Bootstrap for styling. The animation dynamically creates nodes and connects them with vertices, providing a visually appealing network effect.

## Project Description

The application features a black background with white-colored nodes and vertices. Nodes move continuously, altering their angles to create a dynamic animation effect. The main functionalities and constraints are detailed below:

### Functionality

#### Node Movement

- Nodes (represented as small white dots) move randomly within the canvas area, ensuring they do not collide.

#### Node Creation

- **User-Created Nodes:** Clicking anywhere on the black background creates a new node at the cursor's position.
- **Boundary-Created Nodes:** When a node touches the canvas boundary, it creates a child node on the opposite boundary, adhering to specific constraints (e.g., left creates right, top creates bottom).

#### Node Connection

- Every node is connected with a vertex, forming triangles wherever possible.
- Vertices (lines connecting nodes) vary in opacity and thickness based on the distance between nodes, providing depth to the network visualization.

#### Dynamic Behavior

- Nodes and vertices exhibit repelling behavior when they approach the canvas boundary, ensuring they do not stick to the edges. This behavior enhances the visual appeal and maintains the network's fluidity.

#### Cursor Effects

- Before reaching the maximum node limit, the cursor icon resembles a pointing finger, indicating node creation capability.
- After exceeding the node limit, the cursor icon changes to a fan or helicopter-style icon, representing the ability to repel nodes and vertices by moving the cursor.

### Constraints

- **Maximum Node Limit:** Limited nodes can be created. Upon reaching this limit, additional node creation halts.
- **Repelling Effect:** Once the maximum node limit is exceeded, nodes and vertices move away from the cursor's proximity, simulating a repelling wind effect.
- **Boundary Constraints:** Nodes created at canvas boundaries follow specific rules for creating child nodes on the opposite boundary, ensuring balanced network growth.

## Setup and Usage

### Environment Setup

- Ensure you have a modern web browser and VS Code or any text editor installed.

### Dependencies

- The project utilizes Bootstrap 5 for styling, loaded via CDN links. Ensure an internet connection for proper loading.

### Running the Application

1. Clone the repository:
   ```sh
   git clone https://github.com/imbalavamsi/interactive-floating-network-animation.git
   ```
