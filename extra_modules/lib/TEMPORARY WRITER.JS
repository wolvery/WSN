 assert(frame, 'Frame parameter must be a frame object');

  var packet = new Buffer(256); // Packet buffer
  var payload = packet.slice(3); // Reference the buffer past the header
  var builder = new BufferBuilder(payload);

  if(!frame_builder[frame.type])
    throw new Error('This library does not implement building the %d frame type.', frame.type);

  // Let the builder fill the payload
  frame_builder[frame.type](frame, builder);

  // Calculate & Append Checksum
  var checksum = 0;
  for (var i = 7; i < builder.length ; i++) checksum += payload[i];
  
   console.log("checksum: ",255 - (checksum % 256));
  // Get just the payload
  payload = payload.slice(0, builder.length);
  console.log("message:",payload);
  // Build the header at the start of the packet buffer
  builder = new BufferBuilder(packet);
  builder.appendUInt8(C.START_BYTE);
  builder.appendString("3B01F0", 'hex');
  builder.appendString("223d",'hex');
  builder.appendString("223d",'hex');
  builder.appendString("c9",'hex'); // Sans checksum
  builder.appendString("73",'hex');  
  console.log("length:",payload.length -1);
  console.log("bufffer",builder);
  // Get the header and payload as one contiguous buffer
  packet = packet.slice(0, builder.length + payload.length - 7);
  console.log("packet",packet);
  // Escape the packet, if needed