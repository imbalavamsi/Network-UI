// Select canvas and context
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants
const nodeRadius = 3;
const maxDistance = 150;
const nodeSpeed = 0.5;
const initialNodeCount = 130;
const maxNodeCount = 390;
const repelEffectRadius = 50;
const repelForce = 1.5; // Adjust repel force as needed
const childNodeCreationMargin = 10; // Margin from border for child node creation

// Variables
const nodes = [];
let isMaxNodesReached = false;
let cursorX = null;
let cursorY = null;

// Node class
class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * nodeSpeed;
    this.dy = (Math.random() - 0.5) * nodeSpeed;
    this.isParent = true;
  }

  update() {
    // Move node
    this.x += this.dx;
    this.y += this.dy;

    // Border collision detection and repel
    if (
      this.x < nodeRadius ||
      this.x > canvas.width - nodeRadius ||
      this.y < nodeRadius ||
      this.y > canvas.height - nodeRadius
    ) {
      // Calculate repel force
      let repelX = 0;
      let repelY = 0;

      if (this.x < nodeRadius) {
        repelX += repelForce;
      } else if (this.x > canvas.width - nodeRadius) {
        repelX -= repelForce;
      }

      if (this.y < nodeRadius) {
        repelY += repelForce;
      } else if (this.y > canvas.height - nodeRadius) {
        repelY -= repelForce;
      }

      // Apply repel force
      this.dx += repelX;
      this.dy += repelY;

      // Limit maximum speed
      this.dx = Math.max(-nodeSpeed, Math.min(this.dx, nodeSpeed));
      this.dy = Math.max(-nodeSpeed, Math.min(this.dy, nodeSpeed));

      // Create child node on opposite border
      if (this.isParent) {
        this.createChildNode();
      }
    }

    // Ensure nodes stay within canvas bounds
    this.x = Math.max(nodeRadius, Math.min(this.x, canvas.width - nodeRadius));
    this.y = Math.max(nodeRadius, Math.min(this.y, canvas.height - nodeRadius));
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
  }

  createChildNode() {
    if (nodes.length >= maxNodeCount) return;

    let x, y;

    if (this.x < childNodeCreationMargin) {
      // Create child node on right border
      x = canvas.width - childNodeCreationMargin;
      y = this.y;
    } else if (this.x > canvas.width - childNodeCreationMargin) {
      // Create child node on left border
      x = childNodeCreationMargin;
      y = this.y;
    } else if (this.y < childNodeCreationMargin) {
      // Create child node on bottom border
      x = this.x;
      y = canvas.height - childNodeCreationMargin;
    } else if (this.y > canvas.height - childNodeCreationMargin) {
      // Create child node on top border
      x = this.x;
      y = childNodeCreationMargin;
    } else {
      // No valid border contact, exit
      return;
    }

    const newNode = new Node(x, y);
    nodes.push(newNode);
    this.isParent = false;
  }
}

// Initialize nodes
function initNodes() {
  for (let i = 0; i < initialNodeCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    nodes.push(new Node(x, y));
  }
}

// Connect nodes with vertices
function connectNodes(node1, node2) {
  const distance = Math.sqrt(
    (node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2
  );

  if (distance < maxDistance) {
    const opacity = Math.max(0.1, 1 - distance / maxDistance);

    if (isMaxNodesReached && cursorX !== null && cursorY !== null) {
      const dx = (node1.x + node2.x) / 2 - cursorX;
      const dy = (node1.y + node2.y) / 2 - cursorY;
      const distFromCursor = Math.sqrt(dx * dx + dy * dy);

      if (distFromCursor < repelEffectRadius) {
        const angle = Math.atan2(dy, dx);
        node1.x += Math.cos(angle) * nodeSpeed;
        node1.y += Math.sin(angle) * nodeSpeed;
        node2.x += Math.cos(angle) * nodeSpeed;
        node2.y += Math.sin(angle) * nodeSpeed;
      }
    }

    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((node) => node.update());
  nodes.forEach((node) => node.draw());

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      connectNodes(nodes[i], nodes[j]);
    }
  }

  if (nodes.length >= maxNodeCount) {
    isMaxNodesReached = true;
  } else {
    isMaxNodesReached = false;
  }
  canvas.style.cursor = "pointer"; // Pointer cursor

  requestAnimationFrame(animate);
}

// Event listeners for node creation and cursor movement
canvas.addEventListener("click", (event) => {
  if (nodes.length < maxNodeCount) {
    const x = event.clientX;
    const y = event.clientY;
    const newNode = new Node(x, y);
    nodes.push(newNode);
  }
});

canvas.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
});

canvas.addEventListener("mouseleave", () => {
  cursorX = null;
  cursorY = null;
  canvas.style.cursor = "auto"; // Reset cursor on leave
});

// Initialize nodes and start animation
initNodes();
animate();
