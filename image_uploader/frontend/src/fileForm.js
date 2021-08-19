import React from "react";

export const FileForm = React.forwardRef((props, ref) => {
    return (
        <form action="/api/images/" method="POST" encType="multipart/form-data">
            <input
                ref={ref}
                hidden
                name="file"
                type="file"
                id={props.fileInputId}
                accept="image/*"
                onChange={props.onChange}
            />
        </form>
    );
});
