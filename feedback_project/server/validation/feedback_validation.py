feedbackCreateSchema = {
    "type": "object",
    "properties": {"content": {"type": "string", "minLength": 6}},
    "required": ["content"],
}


feedbackUpdateSchema = {
    "type": "object",
    "properties": {"content": {"type": "string", "minLength": 6}},
    "required": ["content"],
}
