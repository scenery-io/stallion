var path = new cavalry.Path();
path.moveTo(0.,0.);
path.lineTo(0.,-100.);
path.lineTo(300.,-100.);
path.cubicTo(210., 110., 240., 140., 280., 260);
path.close();
path.translate(-300,-30);
path.addText("hello world", 274, -700, 300);
path.addRect(-300,-300,-200,-250);
path.addEllipse(250, -300, 100,60);
// this path can then be returned if on the JavaScript layer
// or used to create an Editable Shape like so
api.createEditable(path, "My Path");
