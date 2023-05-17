businessCreateSchema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "minLength": 3, "maxLength": 30},
        "adddres": {"type": "string", "minLength": 10, "maxLength": 100},
        "email": {"type": "string"}    
    },
}
